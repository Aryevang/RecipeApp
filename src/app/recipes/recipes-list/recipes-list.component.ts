import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("test","Another test","https://i.pinimg.com/736x/5e/8c/22/5e8c224446fef0df2ab8dd5d90a6a7fc.jpg"),
    new Recipe("test #2","Test recipe No.2","http://assets.simplyrecipes.com/wp-content/uploads/2015/01/cheesy-tortellini-casserole-vertical-b-1600.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
