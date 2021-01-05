import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {catchError} from 'rxjs/Operators';
import { throwError } from 'rxjs';
import { AuthResponseData } from './AuthResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  signUpURL = environment.authSignUpURL;

  login(email:string, password:string){
  	return this.http.post<AuthResponseData>(environment.authLoginURL, {
		  email: email,
		  password: password,
		  returnSecureToken: true
	  }).pipe(catchError(this.errorHandler));
  }

  signUp(email: string, password: string){
	  return this.http.post<AuthResponseData>(this.signUpURL, {
		  email: email,
		  password: password,
		  returnSecureToken: true
	  }).pipe(catchError(this.errorHandler));
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
