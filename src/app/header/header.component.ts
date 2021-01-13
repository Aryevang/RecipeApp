import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
	constructor(
		private storage: DataStorageService,
		private authService: AuthService
	) {}
	isAuthenticated = false;
	private userSub: Subscription;

	ngOnInit(){
		this.userSub = this.authService.user.subscribe(
			user => {
				this.isAuthenticated = !!user;
			}
		)
	}

	onLogOut(){
		this.authService.logOut();
	}

	onSave(){
		this.storage.storeRecipes();
	}

	onFetch(){
		this.storage.fetchRecipes().subscribe();
	}

	ngOnDestroy()
	{
		this.userSub.unsubscribe();
	}
}
