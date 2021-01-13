import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {RecipeService} from '../recipes/recipes.service';
import { environment } from './../../environments/environment.prod';
import {Recipe} from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/Operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(private http: HttpClient,
				  private recipeService: RecipeService,
				  private authService: AuthService
				 ) { }
	apiURI = environment.recipeURL;

	storeRecipes(){
		const recipes = this.recipeService.getRecipe();
		return this.http.put(this.apiURI, recipes)
			.subscribe(() =>{
			});
	}

	fetchRecipes(){
		//TODO: complete this functionality to send the token to Firebase.
		return this.http.get<Recipe[]>(this.apiURI,).pipe(map(recipes => {
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
