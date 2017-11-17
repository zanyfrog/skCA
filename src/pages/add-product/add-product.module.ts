import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';

import { AddProductPage } from './add-product';

@NgModule({
  declarations: [
    AddProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductPage),
    SharedModule
  ],
  exports: [
    AddProductPage
  ]
})
export class AddProductModule {}
