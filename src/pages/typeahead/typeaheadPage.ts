import { Component } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { IonicPage } from 'ionic-angular';



@IonicPage({
	name: 'testTypeAhead',
	segment: 'test/typeahead'
})
@Component({
	selector: 'page-typeahead',
	templateUrl: 'typeahead.html'
})
export class TypeaheadPage {
	public selected: string;
	public states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
		'California', 'Colorado',
		'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
		'Illinois', 'Indiana', 'Iowa',
		'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
		'Michigan', 'Minnesota',
		'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
		'New Jersey', 'New Mexico',
		'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
		'Pennsylvania', 'Rhode Island',
		'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
		'Virginia', 'Washington',
		'West Virginia', 'Wisconsin', 'Wyoming'];

	public asyncSelected: string;
	public typeaheadLoading: boolean;
	public typeaheadNoResults: boolean;
	public dataSource: Observable<any>;
	public statesComplex: any[] = [
		{ id: 1, name: 'Alabama', region: 'South' }, { id: 2, name: 'Alaska', region: 'West' }, {
			id: 3,
			name: 'Arizona',
			region: 'West'
		},
		{ id: 4, name: 'Arkansas', region: 'South' }, { id: 5, name: 'California', region: 'West' },
		{ id: 6, name: 'Colorado', region: 'West' }, { id: 7, name: 'Connecticut', region: 'Northeast' },
		{ id: 8, name: 'Delaware', region: 'South' }, { id: 9, name: 'Florida', region: 'South' },
		{ id: 10, name: 'Georgia', region: 'South' }, { id: 11, name: 'Hawaii', region: 'West' },
		{ id: 12, name: 'Idaho', region: 'West' }, { id: 13, name: 'Illinois', region: 'Midwest' },
		{ id: 14, name: 'Indiana', region: 'Midwest' }, { id: 15, name: 'Iowa', region: 'Midwest' },
		{ id: 16, name: 'Kansas', region: 'Midwest' }, { id: 17, name: 'Kentucky', region: 'South' },
		{ id: 18, name: 'Louisiana', region: 'South' }, { id: 19, name: 'Maine', region: 'Northeast' },
		{ id: 21, name: 'Maryland', region: 'South' }, { id: 22, name: 'Massachusetts', region: 'Northeast' },
		{ id: 23, name: 'Michigan', region: 'Midwest' }, { id: 24, name: 'Minnesota', region: 'Midwest' },
		{ id: 25, name: 'Mississippi', region: 'South' }, { id: 26, name: 'Missouri', region: 'Midwest' },
		{ id: 27, name: 'Montana', region: 'West' }, { id: 28, name: 'Nebraska', region: 'Midwest' },
		{ id: 29, name: 'Nevada', region: 'West' }, { id: 30, name: 'New Hampshire', region: 'Northeast' },
		{ id: 31, name: 'New Jersey', region: 'Northeast' }, { id: 32, name: 'New Mexico', region: 'West' },
		{ id: 33, name: 'New York', region: 'Northeast' }, { id: 34, name: 'North Dakota', region: 'Midwest' },
		{ id: 35, name: 'North Carolina', region: 'South' }, { id: 36, name: 'Ohio', region: 'Midwest' },
		{ id: 37, name: 'Oklahoma', region: 'South' }, { id: 38, name: 'Oregon', region: 'West' },
		{ id: 39, name: 'Pennsylvania', region: 'Northeast' }, { id: 40, name: 'Rhode Island', region: 'Northeast' },
		{ id: 41, name: 'South Carolina', region: 'South' }, { id: 42, name: 'South Dakota', region: 'Midwest' },
		{ id: 43, name: 'Tennessee', region: 'South' }, { id: 44, name: 'Texas', region: 'South' },
		{ id: 45, name: 'Utah', region: 'West' }, { id: 46, name: 'Vermont', region: 'Northeast' },
		{ id: 47, name: 'Virginia', region: 'South' }, { id: 48, name: 'Washington', region: 'South' },
		{ id: 49, name: 'West Virginia', region: 'South' }, { id: 50, name: 'Wisconsin', region: 'Midwest' },
		{ id: 51, name: 'Wyoming', region: 'West' }];

	public constructor() {
		this.dataSource = Observable
			.create((observer: any) => {
				// Runs on every search
				observer.next(this.asyncSelected);
			})
			.mergeMap((token: string) => this.getStatesAsObservable(token));
	}

	public getStatesAsObservable(token: string): Observable<any> {
		let query = new RegExp(token, 'ig');

		return Observable.of(
			this.statesComplex.filter((state: any) => {
				return query.test(state.name);
			})
		);
	}

	public changeTypeaheadLoading(e: boolean): void {
		this.typeaheadLoading = e;
	}

	public changeTypeaheadNoResults(e: boolean): void {
		this.typeaheadNoResults = e;
	}

	public typeaheadOnSelect(e: TypeaheadMatch): void {
		console.log('Selected value: ', e.value);
	}


}

// https://github.com/valor-software/ngx-bootstrap/blob/development/src/typeahead/typeahead.directive.ts#L23

// @Directive({selector: '[typeahead]', exportAs: 'bs-typeahead'})
// export class TypeaheadDirective implements OnInit, OnDestroy {
//   /** options source, can be Array of strings, objects or an Observable for external matching process */
//   @Input() public typeahead: any;
//   /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
//   @Input() public typeaheadMinLength: number = void 0;
//   /** minimal wait time after last character typed before typeahead kicks-in */
//   @Input() public typeaheadWaitMs: number;
//   /** maximum length of options items list */
//   @Input() public typeaheadOptionsLimit: number;
//   /** when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods. */
//   @Input() public typeaheadOptionField: string;
//   /** when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set. */
//   @Input() public typeaheadGroupField: string;
//   /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
//   @Input() public typeaheadAsync: boolean = void 0;
//   /** match latin symbols. If true the word súper would match super and vice versa. */
//   @Input() public typeaheadLatinize: boolean = true;
//   /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
//   @Input() public typeaheadSingleWords: boolean = true;
//   /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
//   @Input() public typeaheadWordDelimiters: string = ' ';
//   /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
//   @Input() public typeaheadPhraseDelimiters: string = '\'"';
//   /** used to specify a custom item template. Template variables exposed are called item and index; */
//   @Input() public typeaheadItemTemplate: TemplateRef<any>;
//   /** used to specify a custom options list template. Template variables: matches, itemTemplate, query */
//   @Input() public optionsListTemplate: TemplateRef<any>;

//   /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
//   @Output() public typeaheadLoading: EventEmitter<boolean> = new EventEmitter();
//   /** fired on every key event and returns true in case of matches are not detected */
//   @Output() public typeaheadNoResults: EventEmitter<boolean> = new EventEmitter();
//   /** fired when option was selected, return object with data of this option */
//   @Output() public typeaheadOnSelect: EventEmitter<TypeaheadMatch> = new EventEmitter();
//   /** fired when blur event occurres. returns the active item */
//   @Output() public typeaheadOnBlur: EventEmitter<any> = new EventEmitter();

//   /**
//    * A selector specifying the element the typeahead should be appended to.
//    * Currently only supports "body".
//    */
//   @Input() public container: string;


