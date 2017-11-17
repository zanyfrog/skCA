import {  NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import { CommonModule } from '@angular/common';

import { IonicModule } from 'ionic-angular';

import { TypeaheadModule } from 'ngx-bootstrap';

import { MultipleSelectComponent } from './multiple-select.component';


@NgModule({
	declarations: [
		MultipleSelectComponent,
	],
	 imports: [
		FormsModule,
		ReactiveFormsModule,
		 TypeaheadModule.forRoot(),
		 IonicModule,
	// 	// SharedModule,
	// 	//CommonModule,
	// 	//SelectModule,
	// 	// DropDownsModule,
	// 	// MultiSelectModule,
	// 	// MultiselectModule.forRoot()
	 ],
	exports: [
		MultipleSelectComponent
	]
})
export class MultipleSelectComponentModule { }