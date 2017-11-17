import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
//import { TypeaheadModule } from 'ngx-bootstrap';


import {
	ActionListComponent,
	IngredientListComponent,
	MessageListComponent,
	MessageListAllComponent,
	//MultipleSelectComponent,
	PageHeader,
	PageSubHeaderComponent,
	ProductListComponent
} from '../../components/components';

import { MatchesMsgPipe } from '../../pipes/pipes';

@NgModule({
	declarations: [
		ActionListComponent,
		IngredientListComponent,
		PageHeader,
		PageSubHeaderComponent,
		MatchesMsgPipe,
		MessageListComponent,
		MessageListAllComponent,
		//MultipleSelectComponent,
		ProductListComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		//TypeaheadModule.forRoot()
	],
	entryComponents: [
	],
	exports: [
		ActionListComponent,
		IngredientListComponent,
		PageHeader,
		PageSubHeaderComponent,
		MatchesMsgPipe,
		MessageListComponent,
		MessageListAllComponent,
		//MultipleSelectComponent,
		ProductListComponent
	],
})
export class SharedModule { }