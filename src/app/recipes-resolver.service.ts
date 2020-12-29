import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipes/recipe.model';
import {DataStorageService} from './shared/data-storage.service';
import {RecipeService} from './recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor( private storage: DataStorageService,
				 	private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
	  const recipes = this.recipeService.getRecipe();

	  if(recipes.length === 0){
	  		return this.storage.fetchRecipes();
	  } else {
	  	return recipes;
	  }
  }


}
