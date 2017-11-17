import { Observable } from 'rxjs/Observable';

export class UkdSearch{
	dataSource: Observable<any>;
	items : any;
	filteredItems : any;
	minimumLength : number;
	searchingFor : string;
	selected : string;
	typeaheadLoading: boolean;
	typeaheadNoResults: boolean;
	
	minimumSearchLengthReached() : boolean{
		return this.searchingFor.length >= this.minimumLength;
	}
}
