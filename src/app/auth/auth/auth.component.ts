import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Observable} from 'rxjs';
import {AuthResponseData} from '../AuthResponseData';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private frmGroup: FormBuilder,
				  private authService: AuthService) { }
  ngOnInit(): void {
  }

  authForm = this.frmGroup.group({
	  email: ['',[Validators.required, Validators.email]],
	  password: ['',[Validators.required, Validators.minLength(5)]]
  })

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:string = null;

  onSwitchMode(){
  	this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
	  if(!this.authForm.valid){
		  return;
	  }

	  let authObserv: Observable<AuthResponseData>;

	  this.isLoading = true;
	  if(this.isLoginMode){
		  authObserv = this.authService.login(this.authForm.value.email, this.authForm.value.password);
	  }else{
			  authObserv = this.authService.signUp(this.authForm.value.email, this.authForm.value.password);
		  }

		  authObserv.
			  subscribe(
				  response =>{
					  console.log(response);
					  this.isLoading = false;
				  },
				  errorMessage =>{
					  //console.log('ERROR_MESSAGE',errorMessage);
					  this.error = errorMessage;
					  this.isLoading = false;
				  }
		  );

	  this.authForm.reset();
  }

}
