import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError, tap} from 'rxjs/Operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from './AuthResponseData';
import { User } from '../auth/user.model';
import {Router} from '@angular/router';
import {stringify} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
				  private router: Router) { }

  tokenExpirationTimer: any;
  signUpURL = environment.authSignUpURL;
  user = new BehaviorSubject<User>(null);

  login(email:string, password:string){
	  return this.http.post<AuthResponseData>(environment.authLoginURL, {
		  email: email,
		  password: password,
		  returnSecureToken: true
	  }).pipe(catchError(this.errorHandler),
	  tap(resp => {
		  this.AuthenticationHandler(resp.email,resp.elocalId,resp.idToken,+resp.expiresIn);
	  }));
  }

  logOut(){
  	this.user.next(null);
	this.router.navigate(['/auth']);
	localStorage.removeItem("userData");
	if(this.tokenExpirationTimer){
		clearTimeout(this.tokenExpirationTimer);
	}
  }

  signUp(email: string, password: string){
	  return this.http.post<AuthResponseData>(this.signUpURL, {
		  email: email,
		  password: password,
		  returnSecureToken: true
	  }).pipe(catchError(this.errorHandler),
	  tap(resp => {
		  this.AuthenticationHandler(resp.email,resp.elocalId,resp.idToken,+resp.expiresIn);
	  }));
  }

  private AuthenticationHandler(email: string, userId: string, token: string, expiresIn: number){
  	const expiration = new Date(
  		new Date().getTime() + (expiresIn * 1000)
  	);
	const user = new User(
		email,
		userId,
		token,
		expiration
	);
	this.user.next(user);
	this.autoLogout(expiresIn * 1000);
	localStorage.setItem("userData",JSON.stringify(user));
  }

  autoLogin(){
  	 const userData:{ email: string, id: string, _token:string, _tokenExpirationDate:string}= JSON.parse(localStorage.getItem("userData"));
	 if(!userData){
	 	return;
	 }

	 const loadedUser = new User( userData.email, userData.id, userData._token, new Date( userData._tokenExpirationDate));

	 if(loadedUser.token){
	 	this.user.next(loadedUser);
		this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
	 }
  }

  autoLogout(expirationDuration: number){
	  this.tokenExpirationTimer = setTimeout(()=>{
	  	this.logOut();
	  }, expirationDuration);
  }

  //Handle pipe logic needed to cath the errors
  private errorHandler(errorRes: HttpErrorResponse){
		  let errorMessage = "Unknown error";

		  switch(errorRes?.error?.error.message){
			  case "EMAIL_EXISTS":
				  errorMessage = "This email already exist!!";
			  	  break;
			  case "EMAIL_NOT_FOUND":
				  errorMessage = "Wrong credentiasls";
			  	  break;
			  case "INVALID_PASSWORD":
				  errorMessage = "Wrong credentiasls";
				  break;
			  case "USER_DISABLED":
				  errorMessage = "Disabled user";
				  break;
		  }

		  return throwError(errorMessage);
  }

}
