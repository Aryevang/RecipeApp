import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Bolas de carne","description No.1","https://i.pinimg.com/736x/5e/8c/22/5e8c224446fef0df2ab8dd5d90a6a7fc.jpg"),
    new Recipe("Lasagna","description No.2","http://assets.simplyrecipes.com/wp-content/uploads/2015/01/cheesy-tortellini-casserole-vertical-b-1600.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
