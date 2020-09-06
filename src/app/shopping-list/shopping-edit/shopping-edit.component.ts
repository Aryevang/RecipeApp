import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from 'src/app/recipes/recipe.model';
import { ConstantPool } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addIngredient = new EventEmitter<Ingredient>();
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("nameAmountInput") nameAmountInput: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.nameInput.nativeElement.value !== "" && this.nameAmountInput.nativeElement.value !== ""){
      this.addIngredient.emit(
        new Ingredient(this.nameInput.nativeElement.value, 
                       this.nameAmountInput.nativeElement.value
            )
      );
    }
  }

}
