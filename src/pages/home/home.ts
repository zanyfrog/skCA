import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';

import { ApiService, AuthService } from '../../services/services';
import { Page } from '../../classes/classes';

@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	isAuthorized: boolean = false;
	page: Page = new Page();

	constructor(
		public loadingController: LoadingController,
		public apiService: ApiService,
		public auth: AuthService,
		public navCtrl: NavController) {

	}

	ngOnInit() {
		let loader = this.loadingController.create({
		  content: 'Checking Credentials...'
		});
		loader.present().then(() => {
		  this.auth.isAuthenticated()
			.then(data => {
			  if (data) {
				this.isAuthorized = data;
			  }
			  loader.dismiss()
			})
		});
	  }
	
	ionViewDidEnter() {
		this.page.title = 'Home';

		// if (this.auth._isAuthenticated()) {
		// 	console.log("Auth Passed");
		// } else {
		// 	console.log("Auth Failed...");
		// }

		// this.auth.isAuthenticated().then(response => {
		// 	this.isAuthenticated = response;
		// 	console.log("Response: " + response);
		// 	console.log(this.isAuthenticated);
		// });
	}

	gotoPage(page) {
		this.navCtrl.push(page);
	}

}
