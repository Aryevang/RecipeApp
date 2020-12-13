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
      new Recipe("Bolas de carne","description No.1",
                 "https://i.pinimg.com/736x/5e/8c/22/5e8c224446fef0df2ab8dd5d90a6a7fc.jpg",
                 [ 
                    new Ingredient("Carne de Res",2),
                    new Ingredient("Vegetales",5)
                 ]),
      new Recipe("Lasagna","description No.2",
                 "http://assets.simplyrecipes.com/wp-content/uploads/2015/01/cheesy-tortellini-casserole-vertical-b-1600.jpg",
                 [
                    new Ingredient("Pasta",3),
                    new Ingredient("Sazon",2)
                 ]),
      new Recipe("Alitas Picantes","Descripcion No.3",
                 "https://i.ytimg.com/vi/_Rb-UfaNxhI/maxresdefault.jpg",
                 [
                    new Ingredient("Alitas de Pollo",20),
                    new Ingredient("Salsa picante",1)
                 ])
    ];

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
