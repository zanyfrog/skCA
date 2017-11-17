import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { ActionDTO } from '../classes/classes';
import { AppConfig } from '../app/app.config';
import { AuthService } from '../services/services';

@Injectable()
export class ApiService {
	private baseUrlApiCompanyAccess = AppConfig.baseUrl + 'api/CompanyAccess';
	// private baseUrlList = AppConfig.baseUrl + 'api/Lists';
	// private baseUrlUkd = AppConfig.baseUrl + 'api/Ukd';
	// private baseUrlUkdFtpStatus = AppConfig.baseUrl + 'api/UkdFtpStatus';
	private listData = {};
	private ukdListData = {
		searchDate: null,
		searchText: '',
		data: null,
	};

	constructor(
		private http: Http,
		private auth: AuthService) {
	}

	///  Headers that are used to transfer JWT and other needed headers. 
	getApiHeaders(): Headers {
		var contentHeader: Headers = new Headers(
			{ 'Content-Type': 'application/x-www-form-urlencoded' }
		);
		// var token = this.auth.getToken();
		// if (token)
		// 	contentHeader.append('Authorization', 'Bearer ' + token);
		return contentHeader;
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}
	/// 
	/// Get the actions associated with a specific company
	///
	getActions(id: number, forceRefresh: boolean = false): Observable<ActionDTO> {
		if (!forceRefresh) {

		}
		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		return this.http.get(`${this.baseUrlApiCompanyAccess}/Actions/${id}`, options)
			.map(res => res.json())
			.catch(this.handleErrorObservable)
			;
	}

	///
	///  Get all of the parts for a specific action. 
	/// 
	getActionParts(actionId: number, forceRefresh: boolean = false) {
		//Action/{id}/Parts

		if (!forceRefresh) {
		}

		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		return this.http.get(`${this.baseUrlApiCompanyAccess}/Action/${actionId}/Parts`, options)
			.map(res => res.json());
	}

	getMessages() {
		let messageList = [
			{ id: 0, actionId: 1, date: 1499931959544, from: 'Jack Sparrow', text: "Message 1", isRead: false, replies: [] },
			{
				id: 1, actionId: 1, date: 1499931959544, from: 'Elizabeth Swan', text: "Message 2", isRead: true, replies: [
					{ id: 0, date: 1499931959544, from: 'Jack Sparrow', text: "Reply to above message 2", isRead: true, }
				]
			},
			{
				id: 2, actionId: 2, date: 1499931959544, from: 'Will Turner', text: "Message 3", isRead: true, replies: [
					{ id: 4, date: 1499931959544, from: 'Elizabeth Swan', text: "Reply to above message 3", isRead: false, }
				]
			},
			{
				id: 3, actionId: 2, date: 1499931959544, from: 'Elizabeth Swan', text: "Message 4", isRead: true, replies: [
					{ id: 1, date: 1499931959544, from: 'Will Turner', text: "Reply to above message 4", isRead: true, },
					{ id: 2, date: 1499931959544, from: 'Elizabeth Swan', text: "Reply to above message 4", isRead: false, }
				]
			},
			{
				id: 4, actionId: 3, date: 1499931959544, from: 'Captain Barbossa', text: "Message 5", isRead: true, replies: [
					{ id: 3, date: 1499931959544, from: 'Gibbs', text: "Reply to above message 5", isRead: false, }
				]
			},
			{ id: 5, actionId: null, date: 1499931959544, from: 'Jack Sparrow', text: "Message 6", isRead: true, replies: [] }
		];
		return messageList;
	}

	getProducts() {

	}

	/// 
	/// Get the UKD items based upon a string of text that will be filtering the database for. 
	///
	getUkdItems(text: string, forceRefresh: boolean = false): Observable<any> {
		text = text.toLocaleLowerCase();
		//var id = 'getUkdItems_' + text;
		var returnValue: any = {};
		// if (!forceRefresh && this.listData[id]) {
		// 	/// Search through any stored lists to see if one was already retrieved.  
		// 	 //AppConfig.autoComplete.minTyped;

		// 	returnValue = this.listData[id];
		// 	console.log('**no need to make HTTP call, just return the data');
		// 	return Observable.of(returnValue);
		// }
		// var contentHeader = this.getApiHeaders();
		// var options = new RequestOptions({ headers: contentHeader });
		// return this.http.get(`${this.baseUrlApiCompanyAccess}/UkdItems/${text}`, options)
		// 	.map(response => {
		// 		this.listData[id] = response.json();
		// 		returnValue = this.listData[id];
		// 		return returnValue;
		// 	});			

		if (!forceRefresh
			&& (this.ukdListData.searchText.length > 0 && text.indexOf(this.ukdListData.searchText) > -1)
		) {
			/// Search through any stored lists to see if one was already retrieved.  
			//AppConfig.autoComplete.minTyped;

			returnValue = this.ukdListData.data;
			console.log('**no need to make HTTP call, just return the data');
			return Observable.of(returnValue);
		}
		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		return this.http.get(`${this.baseUrlApiCompanyAccess}/UkdItems/${text}`, options)
			.map(response => {
				returnValue = response.json();
				this.ukdListData.data = returnValue;
				this.ukdListData.searchText = text;
				this.ukdListData.searchDate = Date();
				return returnValue;
			}
			, (err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.log('An error occurred:', err.error.message);
				} else {
					// The backend returned an unsuccessful response code.
					// The response body may contain clues as to what went wrong,
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
			);

	}

	private userPlants = {
		date: null,
		data: null,
	};

	//getUkdItems(text: string, forceRefresh: boolean = false): Observable<any> {
	getUsersPlants(forceRefresh: boolean = false): Observable<any> {

		var returnValue: any = {};
		if (!forceRefresh
			&& this.userPlants.data !== null
		) {
			/// Search through any stored lists to see if one was already retrieved.  
			//AppConfig.autoComplete.minTyped;

			returnValue = this.userPlants.data;
			console.log('**no need to make HTTP call, just return the data');
			return Observable.of(returnValue);
		}

		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		var url: string = `${this.baseUrlApiCompanyAccess}/Plants`;
		// return this.http.get(url, options)
		// .map(res => res.json());
		return this.http.get(url, options)
			.map(response => {
				returnValue = response.json();
				this.userPlants.data = returnValue;
				this.userPlants.date = Date();
				return returnValue;
			}
			, (err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.log('An error occurred:', err.error.message);
				} else {
					// The backend returned an unsuccessful response code.
					// The response body may contain clues as to what went wrong,
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
			);
	}

	private userProducts = {
		date: null,
		data: null,
	};
	getPlantProducts(plantIdentifier: string, forceRefresh: boolean = false): Observable<any> {
		var returnValue: any = {};
		if (!forceRefresh
			&& this.userProducts.data !== null
		) {
			/// Search through any stored lists to see if one was already retrieved.  
			//AppConfig.autoComplete.minTyped;

			returnValue = this.userProducts.data;
			console.log('**no need to make HTTP call, just return the data');
			return Observable.of(returnValue);
		}
		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		return this.http.get(`${this.baseUrlApiCompanyAccess}/Products/${plantIdentifier}`, options)
			.map(response => {
				returnValue = response.json();
				this.userProducts.data = returnValue;
				this.userProducts.date = Date();
				return returnValue;
			}
			, (err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.log('An error occurred:', err.error.message);
				} else {
					// The backend returned an unsuccessful response code.
					// The response body may contain clues as to what went wrong,
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
			);
	}

}
