import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/services';

import { Page } from '../../classes/classes';

@IonicPage({
  name: 'dashboard',
  segment: 'dashboard'
})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  isAuthorized: boolean = false;
  page: Page = new Page();

  constructor(
    public auth: AuthService,
    public loadingController: LoadingController) {

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


  ionViewDidLoad() {
    this.page.title = 'Dashboard';
  }

}
