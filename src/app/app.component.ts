import { Component, ViewChild } from '@angular/core';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: string = 'home';

	// homePageMenu : any[] = [
	// 	{ id: 1, pageName: 'home', iconName: 'home', text: 'Home' }, 
	// 	{ id: 2, pageName: 'dashboard', iconName: 'color-palette', text: 'Dashboard'  }, 
	// 	{ id: 3, pageName: 'addIngredients', iconName: 'leaf', text: 'Add Ingredients' },
	// 	{ id: 4, pageName: 'addProducts', iconName: 'basket', text: 'Add Products'  }, 

	// 	//{ id: 5, pageName: 'test', iconName: 'paper', text: 'RE-Certification'  },
	// 	{ id: 6, pageName: 'testTypeAhead', iconName: 'paper-plane', text: 'Typeahead test'  }, 
	// ];

	constructor(
		//public menuCtrl: MenuController,
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			//console.log(this.platform.platforms());

			// disable side menu on desktop
			// if (this.platform.is('core')) {
			// 	this.menuCtrl.enable(false, 'sideMenu');
			// }
		});
	}

	// gotoPage(page) {
	// 	// Reset the content nav to have just this page
	// 	// we wouldn't want the back button to show in this scenario
	// 	this.menuCtrl.close();
	// 	this.nav.setRoot(page);
	// }
}
