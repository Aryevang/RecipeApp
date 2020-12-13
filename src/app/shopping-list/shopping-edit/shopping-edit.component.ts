import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  subscription: Subscription; 
  editingMode: boolean = false;
  editingItemIndex: number;
  editedItem: Ingredient;

  constructor(private fb: FormBuilder,private slService:ShoppingListService) { }

  ngOnInit(): void {
	  this.subscription = this.slService.editingStarted
	  .subscribe(
		  (index: number)=>{
			  this.editingItemIndex = index;
			  this.editingMode = true;
			  this.editedItem = this.slService.getIngredient(index);
			  this.recipeEditForm.setValue({
				  itemName: this.editedItem.name,
				  amount: this.editedItem.amount
			  })
		  }
	  );
  }

  recipeEditForm = this.fb.group({
		itemName: ['',Validators.required],
		amount: ['',Validators.required]
 	 }
  );

  onSubmit(){
	  const newIngredient = new Ingredient(this.recipeEditForm.value.itemName, +this.recipeEditForm.value.amount);
	  if(this.editingMode){
		  this.slService.updateIngredient(this.editingItemIndex, newIngredient)
	  } else {
		  this.slService.addIngredient(newIngredient);
	  }
	  this.resetForm();
  }

  onDelete(){
	  this.slService.deleteIngredient(this.editingItemIndex);
	  this.resetForm();
  }

  resetForm(){
	  this.editingMode = false;
	  this.recipeEditForm.reset();
  }

  ngOnDestroy(){
	  this.subscription.unsubscribe();
  }

}
