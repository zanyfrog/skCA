import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TypeaheadModule } from 'ngx-bootstrap';

// import {MultiselectModule} from 'ngx-multiselect';

// //import {SelectModule} from 'ng-select';
// import { DropDownsModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';



import { AddIngredientPage } from './add-ingredient';
import { MultipleSelectComponentModule } from "../../components/multiple-select/multiple-select.component.module";

@NgModule({
	declarations: [
		AddIngredientPage,
	],
	imports: [
		IonicPageModule.forChild(AddIngredientPage),
		TypeaheadModule,
		SharedModule,
		CommonModule,
		MultipleSelectComponentModule,
		//SelectModule,
		// DropDownsModule,
		// MultiSelectModule,
		// MultiselectModule.forRoot()
	],
	exports: [
		AddIngredientPage
	]
})
export class AddIngredientModule { }
