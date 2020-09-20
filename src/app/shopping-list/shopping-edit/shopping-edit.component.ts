import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("nameAmountInput") nameAmountInput: ElementRef;
  
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.nameInput.nativeElement.value !== "" && this.nameAmountInput.nativeElement.value !== ""){
        this.slService.addIngredient(new Ingredient(this.nameInput.nativeElement.value, 
                                                     this.nameAmountInput.nativeElement.value
                                                     ))
    }
  }

}
