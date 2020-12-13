//import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs';

export class ShoppingListService {
  //ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>(); 
  editingStarted = new Subject<number>();
  ingredientDelete = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
	  return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient){
	  this.ingredients[index] =  newIngredient;
	  this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
	  this.ingredients.splice(index,1)
	  this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
