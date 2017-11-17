import { Component } from '@angular/core';


@Component({
  selector: 'product-list',
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent {

  text: string;

  constructor() {
    console.log('Hello ProductList Component');
    this.text = 'Hello World';
  }

}
