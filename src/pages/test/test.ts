import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { ApiService, AuthService } from '../../services/services';

//import { Ingredient } from '../../classes/classes';
import { Page } from '../../classes/classes';

//import * as _ from 'lodash';

@IonicPage({ name:'test', segment: 'test' })
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  page: Page = new Page();

  constructor(
    public auth: AuthService,
    public apiService: ApiService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Test');
    this.page.title = 'Sample Page';
  }

}
