
import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { App, LoadingController, MenuController, Nav, NavController  } from 'ionic-angular';

import { ApiService, AuthService } from '../../services/services';
import {  AppMenu } from '../../classes/classes';

@Component({
	selector: 'app-menu',
	templateUrl: 'app-menu.component.html'
})
export class AppMenuComponent {
	@ViewChild(Nav) nav: Nav;
	isLoggedIn : boolean;

	menu : AppMenu[] = [
		{ id: 1, pageName: 'home'          , iconName: 'home'         , text: 'Home'           , loggedIn: false }, 
		{ id: 2, pageName: 'dashboard'     , iconName: 'color-palette', text: 'Dashboard'      , loggedIn: true  }, 
		{ id: 3, pageName: 'addIngredients', iconName: 'leaf'         , text: 'Add Ingredients', loggedIn: true  },
		{ id: 4, pageName: 'addProducts'   , iconName: 'basket'       , text: 'Add Products'   , loggedIn: true  }, 

		//{ id: 5, pageName: 'test', iconName: 'paper', text: 'RE-Certification'  },
		//{ id: 6, pageName: 'testTypeAhead', iconName: 'paper-plane', text: 'Typeahead test', loggedIn: true  }, 
	];
	menuFiltered: AppMenu[];

	constructor(
		public auth             : AuthService,
		public loadingController: LoadingController,
		public menuCtrl         : MenuController,
		//public navCtrl          : NavController
		public app              : App
	) {
		this.isLoggedIn = auth.isLoggedIn;
		this.auth.isLoggedInChanged
		.subscribe( (data) => {
			this.isLoggedIn = data;
			this.updateMenu(data);
		});
		
	}

	// angular hook that only loads page once unless "popped"
	ngOnInit() {
	}

	ngAfterViewInit(){
		this.preRender();
	}
	ionViewDidEnter(){
		this.preRender();
	}
	ionViewDidLoad(){
		this.preRender();
	}

	preRender(){
		this.auth.isAuthenticated()
		.then(data => {
			this.updateMenu(data);
		})
	}

	updateMenu(data){
	this.menuFiltered  = this.menu.filter(
		function(e){
				return e.loggedIn == false ||  e.loggedIn == data;
				//return this == e.identifier;
			}
			,data
		);
	}

	ngOnChanges(changes: SimpleChanges) {
		for ( let propName in changes){
			let change = changes[propName];
			let curVal  = JSON.stringify(change.currentValue);
			let prevVal = JSON.stringify(change.previousValue);
			alert( change + ',' + curVal + ',' + prevVal);
		}
	}

	gotoPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.menuCtrl.close();
		//this.nav.setRoot(page);
		//this.navCtrl.setRoot(page);
		//this.app.getActiveNav().setRoot(page);
		this.app.getRootNav().setRoot(page);
	}
	// isLoggedIn(){
	// 	return this.auth.isLoggedIn;
	// }
}



