
// import { Component,  QueryList, ViewChild } from '@angular/core';
// import { AutocompleteGroup, CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";

// import { AppConfig } from '../app/app.config';


// //import { ActionObject, ActionStatus, ActionType } from '../classes/classes';

// export class SkAutoComplete {
// 	@ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;;
// 	data: string;
// 	dataItems: any;
// 	autoCompleteGroup : AutocompleteGroup;
// 	keyPressDelay: any;
// 	length: number;
// 	minTyped: number = AppConfig.autoComplete.minTyped;
// 	model: string;
// 	completerName: string = "completer";
// 	//completer: QueryList<NgAutocompleteComponent>;

// 	constructor(
// 		//public GetItems: any
// 	) {
// 		this.model = "hello world";
// 		this.autoCompleteGroup = 
// 			CreateNewAutocompleteGroup(
// 				'Search / choose in / from list',
// 				this.completerName,
// 				[
// 					{ description: 'Loading list after ' + this.minTyped.toString(), id: '0' },
// 				],
// 				{ titleKey: 'description', childrenKey: null }
// 			);

// 		this.dataItems = [
// 			this.autoCompleteGroup
// 		];
// 	}

// 	Selected(item: SelectedAutocompleteItem) {
// 		console.log(item);
// 	}

// 	Keypress(keycode, item) {
// 		//alert("Keypress keyup(" + keycode.which.toString() + ")");
// 		//alert("Keypress keyup target value(" + keycode.target.value + ")");
// 		//alert("Keypress keyup value(" + item.toString() + ")");
// 		this.length = keycode.target.value.length;
// 		if (this.length < this.minTyped) return; //  only do a lookup after n-letters are typed in. 
// 		if (this.keyPressDelay != null) {  // what to do about escape or other special characters? 
// 			clearTimeout(this.keyPressDelay);
// 			//alert("Keypress timeout cleared(" + keycode.which.toString() + ")");
// 		}
// 		this.keyPressDelay = setTimeout(() => {  // => keeps the scope of "this" as part of the current object.  Otherwise it becomes its own level/scope
// 			//alert("timeout completed Keypress keyup(" + keycode.which.toString() + ")");
// 			this.GetItems(keycode.target.value);
// 		}, 1000);
// 	}

// 	GetItems(text) {
// 		//const component = NgAutocompleteComponent.FindCompleter(this.completerName, this.completer);
// 		var newvalues = 			[
// 				{ title: 'Option 4', id: '1' },
// 				{ title: 'Option 5', id: '2' },
// 				{ title: 'Option 6', id: '3' },
// 				{ title: 'Option 7', id: '4' },
// 				{ title: 'Option 8', id: '5' },
// 				{ title: 'Option 9', id: '6' },
// 			];
// 		this.autoCompleteGroup.SetValues(newvalues);
// 		// component.SetValues(
// 		// 	this.completerName, // <-- NOTE: this is the key of the input. You can call this what you want.
// 		// 	newvalues
// 		// );
// 		// component.SetValues(
// 		// 	newvalues
// 		// );
// 	}
// 	// GetItems(text){
// 	// 	let loader = this.loadingController.create({
// 	// 		content: 'Getting data...'
// 	// 	});
// 	// 	loader.present().then(() => {
// 	// 		this.apiService.getUkdItems(text)
// 	// 			.subscribe(data => {
// 	// 				this.dataItems = data,
// 	// 					loader.dismiss()
// 	// 			})
// 	// 	});
// 	// }

// }