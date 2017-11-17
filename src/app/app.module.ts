import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TooltipModule } from 'angular2-tooltips'

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { TypeaheadModule } from 'ngx-bootstrap';

import { AppMenuComponent, LoginComponent, MessagePopoverComponent } from '../components/components';
import { ApiService, AuthService, MessageService} from '../services/services';

//import {SelectModule} from 'ng-select';

//import { DropDownsModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';  //http://plnkr.co/edit/?p=preview - http://www.telerik.com/kendo-angular-ui/components/dropdowns/multiselect/

@NgModule({
	declarations: [
		AppMenuComponent,
		LoginComponent,
		MessagePopoverComponent,
		MyApp, 
	],
	imports: [
		BrowserModule,
		//FormsModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),
		ReactiveFormsModule,
		TooltipModule,
		TypeaheadModule.forRoot(),
		BrowserAnimationsModule,
		//SelectModule,
		// DropDownsModule,
		// MultiSelectModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		LoginComponent,
		MessagePopoverComponent,
		MyApp,
	],
	exports: [
	],
	providers: [
		ApiService,
		AuthService,
		MessageService,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {
  constructor(
	  authService: AuthService){}
 }
