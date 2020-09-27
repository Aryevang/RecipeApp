import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  recipeID: number;
  editMode: boolean = false;

  ngOnInit(): void {
	  this.route.params
	  	.subscribe(
			(param: Params)=>{
				this.recipeID = +param["id"];
				this.editMode = param["id"] != null;
			}
		)
  }

}
