import { Observable } from 'rxjs/Observable';

export class MultiSelect{
	data: Observable<any>;
	filtered: Observable<any>;
	items : any;
	textField: string = 'description';
	valueField: string = 'identifier'
}
