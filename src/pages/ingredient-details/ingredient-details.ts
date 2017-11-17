import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { ApiService, AuthService } from '../../services/services';

import { Ingredient } from '../../classes/classes';
import { Page } from '../../classes/classes';

import * as _ from 'lodash';

@IonicPage({
  name: 'ingredientdetails',
  segment: 'ingredient/details'
})
@Component({
  selector: 'page-ingredient-details',
  templateUrl: 'ingredient-details.html',
})
export class IngredientDetailsPage {

  ingredient: Ingredient;
  page: Page = new Page();
  pageTitle: string;

  constructor(
    public auth: AuthService,
    public apiService: ApiService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams) {      
    this.ingredient = this.navParams.data;
    if (_.isEmpty(this.ingredient)) {    // redirect to dashboard if ingredient is empty
      this.navCtrl.setRoot('home');
    }
  }
  
  ionViewDidLoad() {
    this.pageTitle = this.ingredient.name + ' Details';
  }

  goBack() {
    this.navCtrl.pop();
  } 

}
