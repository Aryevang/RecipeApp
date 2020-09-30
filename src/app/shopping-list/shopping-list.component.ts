import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.Ingredients = this.slService.getIngredient();
	 this.subscription = this.slService.ingredientChanged
      .subscribe(
        (ingredients: Ingredient[]) =>{
          this.Ingredients= ingredients;
        }
      )
  }

  ngOnDestroy(){
	  this.subscription.unsubscribe();
  }
}
