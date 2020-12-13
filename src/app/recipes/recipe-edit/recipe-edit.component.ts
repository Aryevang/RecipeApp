import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {RecipeService} from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private recipeService: RecipeService, 
				  private rcfBuilder: FormBuilder, 
				  private route: ActivatedRoute,
				  private router: Router) { }
  recipeID: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  ngOnInit(): void {
	  this.route.params
	  	.subscribe(
			(param: Params)=>{
				this.recipeID = +param["id"];
				this.editMode = param["id"] != null;
				this.initForm();
			}
		)
  }
  
  onCancel(){
		this.router.navigate(['../'],{relativeTo: this.route});
  }

  onSubmit(){
	  if(this.editMode){
	  	this.recipeService.updateRecipe(this.recipeID, this.recipeForm.value);
	  }
	  else {
	  	this.recipeService.addRecipe(this.recipeForm.value);
	  }
	  this.onCancel();
  }

  get controls(){
	  return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
	  (<FormArray>this.recipeForm.get('ingredients')).push(
		  new FormGroup({
			  "name": new FormControl(null, Validators.required),
			  "amount": new FormControl(null,[
				  Validators.required,
				  Validators.pattern(/^[1-9]+[0-9]*$/)
			  ])
		  })
	  );
  }

  onDFeleteIngredient(index: number){
 	(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  initForm(){
	  let recipeName= "";
	  let recipeImagePath= "";
	  let recipeDescription= "";
	  let recipeIngredients= new FormArray([]);

	  if(this.editMode){
		  const recipe = this.recipeService.getRecipeById(this.recipeID);
		  recipeName = recipe.name;
		  recipeImagePath = recipe.imagePath;
		  recipeDescription = recipe.description;

		  if(recipe["ingredients"]){
			  for(let ingredient of recipe.ingredients){
				  recipeIngredients.push(
					  new FormGroup({
						  name: new FormControl(ingredient.name, Validators.required),
						  amount: new FormControl(ingredient.amount, [
						  	Validators.required,
							Validators.pattern(/^[1-9]+[0-9]*$/)
						  ])
					  })
				  );
			  }
		  }
	  }

	  this.recipeForm = this.rcfBuilder.group({
		  name: [recipeName, Validators.required],
		  imagePath: [recipeImagePath, Validators.required],
		  description: [recipeDescription, Validators.required],
		  ingredients: recipeIngredients
	  });
  }



}
