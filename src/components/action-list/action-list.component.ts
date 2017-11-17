import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { ApiService, AuthService } from '../../services/services';
import { ActionStatus } from '../../classes/classes';

@Component({
	selector: 'action-list',
	templateUrl: 'action-list.component.html'
})
export class ActionListComponent {

	actionStatus = ActionStatus;
	actions: any;

	constructor(
		public loadingController: LoadingController,
		public apiService: ApiService,
		public auth: AuthService,
		public navCtrl: NavController) {

	}

	// angular hook that only loads page once unless "popped"
	ngOnInit() {
		this.getActions();
	}

	getActions() {
		let loader = this.loadingController.create({
			content: 'Getting Actions...'
		});
		loader.present().then(() => {
			this.apiService.getActions(1)
				.subscribe(data => {
					this.actions = data,
						loader.dismiss()
				})
		});
	}

	getActionDetails(action) {
		this.navCtrl.push('action', { action, 'id': action.id });
	}

	refresh(){
		this.getActions();
	}

}
