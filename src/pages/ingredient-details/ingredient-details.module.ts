import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';

import { IngredientDetailsPage } from './ingredient-details';

@NgModule({
  declarations: [
    IngredientDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientDetailsPage),
    SharedModule
  ],
  exports: [
    IngredientDetailsPage
  ]
})
export class IngredientDetailsModule {}
