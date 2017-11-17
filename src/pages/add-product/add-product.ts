import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Page } from "../../classes/classes";

@IonicPage({
  name: 'addProducts',
  segment: 'products/add'
})
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  page: Page = new Page();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProduct');
    this.page.title = 'Add Products';
  }

}
