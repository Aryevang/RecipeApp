import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private frmGroup: FormBuilder) { }
  ngOnInit(): void {
  }

  authForm = this.frmGroup.group({
	  email: ['',[Validators.required, Validators.email]],
	  password: ['',[Validators.required, Validators.minLength(5)]]
  })

  isLoginMode:boolean = true;

  onSwitchMode(){
  	this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
	  console.log(this.authForm.value);
	  this.authForm.reset();
  }

}
