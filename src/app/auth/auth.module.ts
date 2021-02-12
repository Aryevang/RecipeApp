import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import {RouterModule} from '@angular/router';
import { AuthInterceptopService } from './auth-interceptor.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [
		AuthComponent
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: AuthComponent }
		]),
		SharedModule
	],
	providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptopService, multi: true }
	]
})
export class AuthModule {}
