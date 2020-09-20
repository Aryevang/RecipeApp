import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
   itemSelected = new EventEmitter<Recipe>();

   constructor(private slService: ShoppingListService){}

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
    
    getRecipe(){
       return this.recipes.slice();
    }

    addIngredientesToSL(ingredients: Ingredient[]){
      this.slService.addIngredients(ingredients);
    }
}