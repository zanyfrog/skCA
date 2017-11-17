import { Component, Input } from '@angular/core';
import { LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ApiService, AuthService } from '../../services/services';

import { LoginComponent } from '../../components/components';

@Component({
  selector: 'page-header',
  templateUrl: 'header.component.html',
})
export class PageHeader {
  user: string = null;
  isAuthorized: boolean = false;

  @Input('page-title') pageTitle: string = '';

  constructor(
    public apiService: ApiService,
    public auth: AuthService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) {

    //this.user = this.auth.getUser();
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
            this.user = this.auth.getUser();
          }
          loader.dismiss()
        })
    });
  }

  showLoginPopover(event) {
    let popover = this.popoverCtrl.create(LoginComponent);
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      this.user = this.auth.getUser();
    });
  }

  logout() {
    this.auth.logout();
    this.user = null;
  }
}
