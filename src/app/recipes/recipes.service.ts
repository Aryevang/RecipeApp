import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
   constructor(private slService: ShoppingListService){}
	recipesChanged = new Subject<Recipe[]>();
	//If the client don't add an image link, this will be the default image.
	imageNotFound : string = "https://www.warwicklodgedental.co.uk/wp-content/themes/wlodge/images/no-image-found-360x250.png"

   private recipes: Recipe[] = [
    ];

	 setRecipes(recipe: Recipe[]){
	 	this.recipes = recipe;
		this.recipesChanged.next(this.recipes.slice());
	 }

	 getRecipeById(index: number){
		 return this.recipes[index];
	 }
    
    getRecipe(){
       return this.recipes.slice();
    }

    addIngredientesToSL(ingredients: Ingredient[]){
      this.slService.addIngredients(ingredients);
    }

	 addRecipe(recipe: Recipe){
		if(recipe.imagePath==="")
			recipe.imagePath = this.imageNotFound;
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	 }

	 deleteReceipe(id: number){
		 this.recipes.splice(id,1);
		 this.recipesChanged.next(this.recipes.slice());
	 }

	 updateRecipe(index: number, recipe: Recipe){
		this.recipes[index] = recipe;
		this.recipesChanged.next(this.recipes.slice());
	 }
}
