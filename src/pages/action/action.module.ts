import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';

import { ActionPage } from './action';

@NgModule({
  declarations: [
    ActionPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionPage),
    SharedModule
  ],
  exports: [
    ActionPage
  ]
})
export class ActionModule {}
