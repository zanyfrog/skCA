import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';

import { TypeaheadPage } from './typeaheadPage';
import { TypeaheadModule } from 'ngx-bootstrap';


@NgModule({
	declarations: [
		TypeaheadPage,
	],
	imports: [
		IonicPageModule.forChild(TypeaheadPage),
		TypeaheadModule,
	],
	exports: [
		TypeaheadPage
	]
})
export class TypeaheadPageModule { }
