// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
// 	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
// 	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
// 	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
// 	return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// var __metadata = (this && this.__metadata) || function (k, v) {
// 	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
// };


import { Component, NgModule, Input, Output, EventEmitter, OnInit, Directive, TemplateRef } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { IonicPageModule } from 'ionic-angular';

import { TypeaheadModule, TypeaheadMatch, TypeaheadDirective } from 'ngx-bootstrap';

//import { SharedModule } from '../../pages/shared/shared.module';

// https://plnkr.co/edit/sZNw1lO2y3ZZR0GxLyjD?p=preview

@Component({
	selector: 'multiple-item-selection',
	templateUrl: './multiple-select.component.html',
 })

export class MultipleSelectComponent implements OnInit{
	@Input() dataSource;
	@Input() formControlName;
	@Input() sk_ngModel : string;

	@Output() sk_ngModelChange : EventEmitter<string> = new EventEmitter<string>();
	
	@Output() sk_onchange = new EventEmitter();
	@Output() ngModelChange = new EventEmitter();
	@Input() plaeceholder;
	// //@Input('dataSource') dataSource: string = '';


	// typeahead decorators
	@Input() sk_typeahead : object;
	@Input() sk_typeaheadMinLength : number;
	@Input() sk_typeaheadWaitMs : number;
	@Input() sk_typeaheadOptionsLimit : number;
	@Input() sk_typeaheadOptionField : string;
	@Input() sk_typeaheadGroupField : string;
	@Input() sk_typeaheadAsync : boolean;
	@Input() sk_typeaheadLatinize : boolean;
	@Input() sk_typeaheadSingleWords : boolean;
	@Input() sk_typeaheadWordDelimiters : string;
	@Input() sk_typeaheadPhraseDelimiters : string;
	@Input() sk_typeaheadItemTemplate : TemplateRef<any>;
	@Input() sk_optionsListTemplate : TemplateRef<any>;

	@Output() sk_typeaheadLoading : EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() sk_typeaheadNoResults : EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() sk_typeaheadOnSelect : EventEmitter<TypeaheadMatch>= new EventEmitter<TypeaheadMatch>();
	@Output() sk_typeaheadOnBlur : EventEmitter<any>;

	@Input() sk_container : string;
	@Input() sk_dropup : boolean;
	

// 	__decorate([
// 		Input,
// 		__metadata("design:type", Object)
//   ], TypeaheadDirective.prototype, "typeahead", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", Number)
//   ], TypeaheadDirective.prototype, "typeaheadMinLength", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", Number)
//   ], TypeaheadDirective.prototype, "typeaheadWaitMs", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", Number)
//   ], TypeaheadDirective.prototype, "typeaheadOptionsLimit", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", string)
//   ], TypeaheadDirective.prototype, "typeaheadOptionField", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", string)
//   ], TypeaheadDirective.prototype, "typeaheadGroupField", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", boolean)
//   ], TypeaheadDirective.prototype, "typeaheadAsync", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", boolean)
//   ], TypeaheadDirective.prototype, "typeaheadLatinize", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", boolean)
//   ], TypeaheadDirective.prototype, "typeaheadSingleWords", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", string)
//   ], TypeaheadDirective.prototype, "typeaheadWordDelimiters", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", string)
//   ], TypeaheadDirective.prototype, "typeaheadPhraseDelimiters", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", TemplateRef)
//   ], TypeaheadDirective.prototype, "typeaheadItemTemplate", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", TemplateRef)
//   ], TypeaheadDirective.prototype, "optionsListTemplate", void 0);
//   __decorate([
// 		Output(),
// 		__metadata("design:type", EventEmitter)
//   ], TypeaheadDirective.prototype, "typeaheadLoading", void 0);
//   __decorate([
// 		Output(),
// 		__metadata("design:type", EventEmitter)
//   ], TypeaheadDirective.prototype, "typeaheadNoResults", void 0);
//   __decorate([
// 		Output(),
// 		__metadata("design:type", EventEmitter)
//   ], TypeaheadDirective.prototype, "typeaheadOnSelect", void 0);
//   __decorate([
// 		Output(),
// 		__metadata("design:type", EventEmitter)
//   ], TypeaheadDirective.prototype, "typeaheadOnBlur", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", string)
//   ], TypeaheadDirective.prototype, "container", void 0);
//   __decorate([
// 		Input(),
// 		__metadata("design:type", boolean)
//   ], TypeaheadDirective.prototype, "dropup", void 0);


	// formControlName="ukdLookup" 
	// [(ngModel)]="ukdSearch.selected" 
	// [typeahead]="dataSource" 
	// (typeaheadLoading)="changeTypeaheadLoading($event)"
	// (typeaheadNoResults)="changeTypeaheadNoResults($event)" 
	// (typeaheadOnSelect)="typeaheadOnSelect($event)" 
	// typeaheadAsync="true"
	// typeaheadMinLength="5" 
	// typeaheadWaitMs="1000" 
	// typeaheadOptionsLimit="999" 
	// typeaheadOptionField="agencyUniqueId" 
	// typeaheadGroupField="companyName"
	// typeaheadSingleWords="false" 
	// [typeaheadItemTemplate]="customItemTemplate" 
	// placeholder="UKD loaded with timeout"

	// constructor(_renderer: Renderer, _elementRef: ElementRef) {
	// 	super(_renderer, _elementRef);
	// }

	// ngx-bootstrap
    /** options source, can be Array of strings, objects or an Observable for external matching process */
    typeahead: any;
    /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
    typeaheadMinLength: number;
    /** minimal wait time after last character typed before typeahead kicks-in */
    typeaheadWaitMs: number;
    /** maximum length of options items list */
    typeaheadOptionsLimit: number;
    /** when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods. */
    typeaheadOptionField: string;
    /** when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set. */
    typeaheadGroupField: string;
    /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
    typeaheadAsync: boolean;
    /** match latin symbols. If true the word súper would match super and vice versa. */
    typeaheadLatinize: boolean;
    /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
    typeaheadSingleWords: boolean;
    /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
    typeaheadWordDelimiters: string;
    /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
    typeaheadPhraseDelimiters: string;
    /** used to specify a custom item template. Template variables exposed are called item and index; */
    typeaheadItemTemplate: TemplateRef<any>;
    /** used to specify a custom options list template. Template variables: matches, itemTemplate, query */
    optionsListTemplate: TemplateRef<any>;
    /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
    typeaheadLoading: EventEmitter<boolean>;
    /** fired on every key event and returns true in case of matches are not detected */
    //typeaheadNoResults: EventEmitter<boolean> = new EventEmitter<boolean>();
    typeaheadNoResults: EventEmitter<boolean>;
    /** fired when option was selected, return object with data of this option */
    typeaheadOnSelect: EventEmitter<TypeaheadMatch>;
    /** fired when blur event occurres. returns the active item */
    typeaheadOnBlur: EventEmitter<any>;
    /**
     * A selector specifying the element the typeahead should be appended to.
     * Currently only supports "body".
     */
    container: string;
    /** This attribute indicates that the dropdown should be opened upwards */
    dropup: boolean;


	constructor(){
		//console.warn('(multiple-item-selection) constructor ');
	}
	ngOnInit(){
		//console.warn('(multiple-item-selection) entering ngOnInit: ');
		//this.ngModelChange.emit(this.ngModel.toDateString());
		//console.warn("(multiple-item-selection) ngModel is: " + this.sk_ngModel);
		//this.initTypeahead();
	 }
	 initTypeahead(){  // ngx-bootstrap
        /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
        this.typeaheadMinLength = void 0;
        /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
        this.typeaheadAsync = void 0;
        /** match latin symbols. If true the word súper would match super and vice versa. */
        this.typeaheadLatinize = true;
        /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
        this.typeaheadWordDelimiters = ' ';
        /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
        this.typeaheadPhraseDelimiters = '\'"';
        /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
        this.typeaheadLoading = new EventEmitter();
        /** fired on every key event and returns true in case of matches are not detected */
        this.typeaheadNoResults = new EventEmitter();
        /** fired when option was selected, return object with data of this option */
        this.typeaheadOnSelect = new EventEmitter();
        /** fired when blur event occurres. returns the active item */
        this.typeaheadOnBlur = new EventEmitter();
        /** This attribute indicates that the dropdown should be opened upwards */
        this.dropup = false;
	 
	}

	public changeTypeaheadLoading(e: boolean): void {
		this.sk_typeaheadLoading.emit(e);
	}

	public changetypeaheadOnSelect(e: TypeaheadMatch): void {
		this.sk_typeaheadOnSelect.emit(e);
	}
	
	valueChanged(item){
		this.sk_ngModelChange.emit(this.sk_ngModel);
		//this.sk_onchange.emit(this.sk_ngModel);
	}
}

