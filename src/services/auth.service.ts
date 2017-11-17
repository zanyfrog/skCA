import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { AppConfig } from '../app/app.config';
import { Observable } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";


@Injectable()
export class AuthService {
	LOGIN_URL: string = AppConfig.baseUrl + "token";

	static token: string;
	//local: Storage = new Storage();
	jwtHelper: JwtHelper = new JwtHelper();
	retrievingToken: boolean;
	user: string = null;

	contentHeader: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

	isLoggedInChanged : Subject<boolean> = new Subject<boolean>();

	private _isLoggedIn : boolean = false;
	get isLoggedIn() {
      return this._isLoggedIn;
  };
  
  set isLoggedIn(value) {
    this._isLoggedIn = value;
    this.isLoggedInChanged.next(this._isLoggedIn);
 	}
	
	constructor(
		private http: Http,
		private local: Storage) {
		AuthService.token = this.getToken();
	}

	public authSuccess(token) {
		AuthService.token = token;
		this.local.set('id_token', token);
		return this.jwtHelper.decodeToken(token).given_name;
	}

	public isAuthenticated(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			// check local storage 1st for saved token and make sure it isn't expired
			let storedToken = this.getToken();
			let retVal = false;
			if (storedToken) {
				let notExpired = tokenNotExpired(null, storedToken);
				if (!notExpired) {
					console.log("Token Expired!");
					this.logout();
					retVal = false;
				}
				console.log("Token Found...");
				this.getUser();
				this.isLoggedIn = true;
				retVal = true;
			} else {
				console.log("No token stored...");
				retVal = false
				this.isLoggedIn = false;
			}
			resolve(retVal)
		});
	}

	public _isAuthenticated(): boolean {
		// check local storage 1st for saved token and make sure it isn't expired
		let storedToken = this.getToken();
		if (storedToken) {
			let notExpired = tokenNotExpired(null, storedToken);
			if (!notExpired) {
				console.log("Token Expired!");
				this.logout();
				return false;
			}
			console.log("Token Found...");
			this.getUser();
			return true;
		} else {
			console.log("No token stored...");
			return false;
		}
	}

	public getToken() {
		if (!AuthService.token && !this.retrievingToken) {
			this.retrievingToken = true;
			this.local.get('id_token').then(token => {
				this.retrievingToken = false;
				AuthService.token = token;
				console.log("Token: " + AuthService.token);
				return AuthService.token;
			});
		}
		return AuthService.token;
	}

	public getUser(): string {
		if (!this.user && AuthService.token != null) {
			this.user = this.jwtHelper.decodeToken(AuthService.token).given_name;
			return this.user
		}
		return this.user;
	}

	public login(username: string, password: string): Observable<boolean> {
		var data = "grant_type=password&username=" + username + "&password=" + password;

		return this.http.post(this.LOGIN_URL, data, { headers: this.contentHeader })
			.map((response: Response) => {
				// login successful if there's a jwt token in the response
				let token = response.json() && response.json().access_token;
				if (token) {
					// set token property
					this.authSuccess(token);
					// return true to indicate successful login
					this.isLoggedIn = true;
					
					return true;
				} else {
					// return false to indicate failed login
					this.isLoggedIn = false;
					return false;
				}
			})
			.catch((error: any) => {
				return Observable.throw(error);
			});
	}

	public logout() {
		this.local.remove('id_token').then(token => {
			console.log("logout: Token removed from storage")
		});
		AuthService.token = null;
		this.user = null;
		this.isLoggedIn = false;
	}

	// public profile(): any {
	// 	this.local.get('profile').then(profile => {
	// 		return profile;
	// 	}).catch(error => {
	// 		console.log(error);
	// 	});
	// }

}