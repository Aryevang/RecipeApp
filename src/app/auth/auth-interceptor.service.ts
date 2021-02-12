import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import {take, exhaustMap} from "rxjs/Operators";

@Injectable()
export class AuthInterceptopService implements HttpInterceptor {
	constructor(private authService: AuthService){}

	intercept(req: HttpRequest<any>, next: HttpHandler){
		return this.authService.user.pipe(
			take(1),
			exhaustMap(user => {
				if(!user){
					console.log(user);
					return next.handle(req);
				}
				const modifiedReq = req.clone({ 
					params: new HttpParams().set('auth', user.token)
				});
				return next.handle(modifiedReq);
			})
		)
	}
}
