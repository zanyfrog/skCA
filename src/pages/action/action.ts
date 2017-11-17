import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ActionType, Page } from "../../classes/classes";
import { ApiService, AuthService } from '../../services/services';

import * as _ from 'lodash';

@IonicPage({
	name: 'action',
	segment: 'action/details/:id'
})
@Component({
	selector: 'page-action',
	templateUrl: 'action.html',
})
export class ActionPage {

	page: Page = new Page();
	action: any;
	actionDisplay: any;
	actionParts: any = [];
	ingredients: any = [];

	constructor(
		public apiService: ApiService,
		public auth: AuthService,
		public loadingController: LoadingController,
		public navCtrl: NavController,
		public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.action = this.navParams.get('action');
		console.log(this.action);
		if (_.isEmpty(this.action)) {    // redirect to dashboard if action is empty (will eventually be able to get action by ID if action is not passed...)
			this.navCtrl.setRoot('home');
		}
		this.page.title = this.action.date + ' -- ' + this.action.action + ' Details';
		switch (this.action.type) {
			case ActionType.loc:
				this.actionDisplay = 'loc'
				break;

			case ActionType.newIngredient:
				this.actionDisplay = 'ingredient'				
				break;

			case ActionType.newProduct:
				this.actionDisplay = 'product'
				break;

			case ActionType.recertification:
				this.actionDisplay = 'recertification'
				break;

			default:
				break;
		}
	}

	goBack() {
		this.navCtrl.pop();
	}

	getActionParts(actionId: number) {
		let loader = this.loadingController.create({
			content: 'Getting Data...'
		});
		loader.present().then(() => {
			this.apiService.getActionParts(actionId)
				.subscribe(data => {
					this.actionParts = data,
						loader.dismiss()
				})
		});
	}

	getIngredientDetails($event, ingredient) {
		this.navCtrl.push('ingredientdetails', ingredient);
	}

	goToMessages($event, ingredient) {

	}
}
