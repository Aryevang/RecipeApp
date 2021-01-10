import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {catchError, tap} from 'rxjs/Operators';
import { throwError, Subject } from 'rxjs';
import { AuthResponseData } from './AuthResponseData';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  signUpURL = environment.authSignUpURL;
  user = new Subject<User>();

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
  }

  //Handle pipe logic needed to cath the errors
  private errorHandler(errorRes: HttpErrorResponse){
		  let errorMessage = "Unknown error";

		  switch(errorRes?.error?.error.message){
			  case "EMAIL_EXISTS":
				  errorMessage = "This email already exist!!";
			  	  break;
			  case "EMAIL_NOT_FOUND":
				  errorMessage = "Email not found";
			  	  break;
			  case "INVALID_PASSWORD":
				  errorMessage = "Invalid Password";
				  break;
			  case "USER_DISABLED":
				  errorMessage = "Disabled user";
				  break;
		  }

		  return throwError(errorMessage);
  }

}
