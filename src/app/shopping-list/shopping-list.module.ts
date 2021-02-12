import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{ path: '', component: ShoppingListComponent} //The path was removed to use lazy loading.
		]),
		SharedModule
	]
})
export class ShoppingListModule {}
