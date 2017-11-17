import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';

import { TestPage } from './test';

@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
    SharedModule
  ],
  entryComponents: [
    TestPage
  ],
  exports: [
    TestPage
  ]
})
export class TestPageModule {}
