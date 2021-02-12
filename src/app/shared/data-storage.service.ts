import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RecipeService} from '../recipes/recipes.service';
import { environment } from './../../environments/environment';
import {Recipe} from '../recipes/recipe.model';
import { map, tap } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(private http: HttpClient,
				  private recipeService: RecipeService
				 ) { }
	apiURI = environment.recipeURL;

	storeRecipes(){
		const recipes = this.recipeService.getRecipe();
		return this.http.put(this.apiURI, recipes)
			.subscribe(() =>{
			});
	}

	fetchRecipes(){
		return this.http.get<Recipe[]>(this.apiURI).pipe(map(recipes => {
			return recipes.map( recipe => {
				return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []};
			});
		}),
		tap(recipes => {
			this.recipeService.setRecipes(recipes);
		})
	 );
	}
}
