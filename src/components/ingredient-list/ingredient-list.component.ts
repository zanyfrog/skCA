import { Component, Input } from '@angular/core';

import { Ingredient } from "../../classes/classes";

@Component({
  selector: 'ingredient-list',
  templateUrl: 'ingredient-list.component.html'
})
export class IngredientListComponent {

  @Input() action: any;
  @Input() ingredients: Ingredient[];

  constructor() { 
  }

}
   