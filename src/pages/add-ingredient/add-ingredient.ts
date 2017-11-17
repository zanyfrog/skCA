import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';
import { of } from 'rxjs/Observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';


import { AppConfig } from '../../app/app.config';
import { ApiService, AuthService } from '../../services/services';
import { Ingredient, MultiSelect, Page, UkdSearch } from "../../classes/classes";

@IonicPage({
	name: 'addIngredients',
	segment: 'ingredients/add'
})
@Component({
	selector: 'page-add-ingredient',
	templateUrl: 'add-ingredient.html',
})
export class AddIngredientPage {
	@ViewChild("plantList") plantList;

	addIngredientForm: FormGroup;
	minTyped: number = AppConfig.autoComplete.minTyped;

	action: any = { id: 'new' }; // create a new action
	ingredients: Ingredient[] = [];
	page: Page = new Page();

	public dataSource: Observable<any>;
	public ukdSearch: UkdSearch = new UkdSearch();
	public plants: MultiSelect = new MultiSelect;     // http://www.telerik.com/kendo-angular-ui/components/dropdowns/api/MultiSelectComponent/#toc-valuechange-eventemitter
	public products: MultiSelect = new MultiSelect;

	options1: Array<any> = [];
	multiple1: boolean = true;

	//public listItems: Array<string> = ["Baseball", "Basketball", "Cricket", "Field Hockey", "Football", "Table Tennis", "Tennis", "Volleyball"];
	
	//public value = null; //['Basketball', 'Cricket'];

	//public asyncSelected: string;
	//ukdLookupFormControl = new FormControl('');

	constructor(
		public apiService: ApiService,
		public auth: AuthService,
		public loadingController: LoadingController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private local: Storage) {

		this.addIngredientForm = new FormGroup({
			locFile: new FormControl(''),
			ukd: new FormControl(''),
			ukdLookup: new FormControl(''),
			lotId: new FormControl(''),
			itemManufacturer: new FormControl(''),
			itemName: new FormControl(''),
			selectMultiple: new FormControl(''),
			plantList: new FormControl(''),
		});

		this.getItemsFromStorage();

		this.ukdSearch.minimumLength = this.minTyped;
		this.ukdSearch.selected = 'what';
		/// Set up the async for the UKD TypeAhead
		//this.ukdSearch.dataSource = Observable
		// this.dataSource = Observable
		// 	.create((observer: any) => {
		// 		// Runs on every search
		// 		//observer.next(this.ukdLookupFormControl);
		// 		observer.next( this.ukdSearch.searchingFor)
		// 	})
		// 	//.mergeMap((token: string) => this.getStatesAsObservable(token));
		// 	.mergeMap((token: string) => this.getUkdItems(token));

	}

	ngOnChanges() {
		console.log('entering ngOnChanges: ');
	}

	ngOnInit() {
		console.log('entering ngOnInit: ');
		this.dataSource = Observable.create((observer: any) => {
			this.getUkdItems(this.ukdSearch.selected)
				.subscribe((result: any) => {
					observer.next(result);
					observer.complete();
				});
		});
		this.getUserPlants();
		this.getPlantProducts();
	}
	ngDoCheck() {
		console.log('entering ngDoCheck: ');
	}
	ngAfterContentInit() {
		console.log('entering ngAfterContentInit: ');
	}
	ngAfterContentChecked() {
		console.log('entering ngAfterContentChecked: ');
	}
	ngAfterViewInit() {
		console.log('entering ngAfterViewInit: ');
		// this.plantList.filterChange.asObservable().switchMap(value => Observable.from([this.plants.data])
		// .delay(1000)
		// .map((data) =>  this.plants.data.filter( q=> (q.description.contains(value)) )))
		// .subscribe(x => (this.plants.data = x));
	}
	

	ngAfterViewChecked() {
		console.log('entering ngAfterViewChecked: ');
	}
	ngOnDestroy() {
		console.log('entering ngOnDestroy: ');
	}

	ionViewDidLoad() {
		this.page.title = 'Add Ingredients';
	}

	addFromLoc() {
		alert('To Be Added!');
	}

	addIngredientManual() {
		let lotId = this.addIngredientForm.value.lotId;
		let manufacturer = this.addIngredientForm.value.itemManufacturer;
		let name = this.addIngredientForm.value.itemName;
		let newIngredient = new Ingredient();
		newIngredient.invId = lotId;
		newIngredient.manufacturer = manufacturer;
		newIngredient.name = name;
		this.ingredients.push(newIngredient);
		this.updateStorage();
		this.addIngredientForm.reset();
	}

	clearAll() {
		if (confirm('Are You Sure? This Cannot be undone')) {
			this.ingredients = [];
			this.local.remove('wipIngredients');
		}
	}

	setSearchingFor(item: any) {
		this.ukdSearch.searchingFor = "";
		if (item instanceof FormControl) {
			this.ukdSearch.searchingFor = item.value;
		}
		else {
			this.ukdSearch.searchingFor = item;
		}
	}

	getUserPlants(){
		return this.apiService.getUsersPlants()
		.subscribe(data => {
			this.plants.data = data
			this.plants.filtered = data
		});
	}
	getPlantProducts(){
		return this.apiService.getPlantProducts("")
		.subscribe(data => {
			this.products.data = data;
			return this.filterProducts(this.plants.items);
		});
	}

	/// retrieve a list of items to populate the drop down.
	public getUkdItems(text): Observable<any> { // text may be a form control. 
		this.setSearchingFor(text);
		var returnValue = [];
		if (this.ukdSearch.searchingFor.length < this.minTyped) return Observable.of(returnValue);

		var self = this;
		var replaceString = '(?=.*' + this.ukdSearch.searchingFor.replace(new RegExp(' ', 'g'), ')(?=.*') + ').*';
		var query = new RegExp(replaceString, 'i');  // do not use g (global), an issue with it storing the position of the last "test". 

		/// Call the service to retrieve the results
		return self.apiService.getUkdItems(this.ukdSearch.searchingFor)
			.map(items => {
				this.ukdSearch.items = items;
				this.ukdSearch.filteredItems =
					items.filter((x, idx) => {
						return this.filterItem(x, query);
					});
				return this.ukdSearch.filteredItems;
			})
			;
	};

	filterItem(item, query) {
		if (item != null) {
			if (!item.description) {
				this.ukdSearch.items.map((obj) => {
					obj.description = obj.companyName + ": " + obj.agencyUniqueId + " - " + obj.itemname;
					return obj;
				});
			}
		}
		var retVal = query.test(item.description);
		if (retVal)
			return true;
		return false;
	};

	filterItems(items, query) {
		this.ukdSearch.items = items;
		if (this.ukdSearch.items != null) {
			//if (!this.ukdSearch.items.description) {
			this.ukdSearch.items.map((obj) => {
				obj.description = obj.agencyUniqueId + " - " + obj.itemname;
				return obj;
			});
			//}
		}
		this.ukdSearch.filteredItems = items.filter((ukddata: any) => {
			var retVal = query.test(ukddata.description);
			if (retVal)
				return true;
			return false;
		});
		return this.ukdSearch.filteredItems;
	}

	getItemsFromStorage() {
		let loader = this.loadingController.create({
			content: 'Getting Data...'
		});
		loader.present().then(() => {
			this.local.get('wipIngredients').then(ingredients => {
				if (ingredients != undefined) {
					this.ingredients = ingredients;
				}
				loader.dismiss()
			});
		});
	}

	onSubmit() {
		alert("Don't Push Me!!!");
	}

	updateStorage() {
		this.local.set('wipIngredients', this.ingredients);
	}

	filterProducts(plants:Array<any>){
		if ( this.products.data){
			if (Array.isArray(plants)){
				var plantIds = [];
				for ( var i=0; i < plants.length; i++){
					var item = plants[i].identifier;
					if ( item != null ){
						plantIds.push(item);
					}
				}
				if (plantIds.length > 0){
					this.products.filtered = this.products.data.filter(
						function(e){
								return this.indexOf(e.plantId) > -1;
								//return this == e.identifier;
							}
							,plantIds
						);
				}
				//alert(  plantIds );
			}
			return this.products.filtered;
		}
	}

	valueChangePlants(obj){
		this.filterProducts(obj);
		// if (Array.isArray(obj)){
		// 	var plantIds = [];
		// 	for ( var i=0; i < obj.length; i++){
		// 		var item = obj[i].identifier;
		// 		if ( item != null ){
		// 			plantIds.push(item);
		// 		}
		// 	}
		// 	if (plantIds.length > 0){
		// 	}
		// 	alert(  plantIds );
		// }
	}
	public changeTypeaheadLoading(e: boolean): void {
		this.ukdSearch.typeaheadLoading = e;
	}

	public changeTypeaheadNoResults(e: boolean): void {
		this.ukdSearch.typeaheadNoResults = e;
	}

	public typeaheadOnSelect(e: TypeaheadMatch): void {
		console.log('Selected value: ', e.value);
		this.addIngredientForm.controls.itemManufacturer.setValue(e.item.companyName);
		//this.addIngredientForm.value.itemName = e.item.itemname;
		this.addIngredientForm.controls.itemName.setValue(e.item.itemname);
		this.addIngredientForm.controls.ukd.setValue(e.item.agencyUniqueId);

		// Kludge.  reset the search value back to what was last searched for. 
		this.ukdSearch.selected = this.ukdSearch.searchingFor;
	}

	valueChanged(event) {
		this.ukdSearch.selected = event;
	 }

	onMultipleOpened() {
		//this.logMultiple('- opened');
	}
	onMultipleClosed() {
		//this.logMultiple('- closed');
	}
	onMultipleSelected(item) {
		//this.logMultiple('- selected (value: ' + item.value  + ', label:' + item.label + ')');
	}
	onMultipleDeselected(item) {
		//this.logMultiple('- deselected (value: ' + item.value + ', label:' + item.label + ')');
	}

}