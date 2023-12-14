// dish-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dish, DishDto} from "../api/api.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-salad-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent {
  @Output() createDish = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  dishForm: FormGroup;

  constructor(private formBuilder: FormBuilder,public translate: TranslateService) {
    this.dishForm = this.formBuilder.group({
      filename: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      saladType: ['regular', Validators.required],
      descriptions: ['', Validators.required],
    });
  }

addIngredient() {
  const ingredientsArray = this.dishForm.get('ingredients') as FormArray;
  ingredientsArray.push(
    this.formBuilder.group({
      name: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0)]],
      calories : [0, [Validators.required, Validators.min(0)]]
    })
  );
  this.dishForm.updateValueAndValidity();
}

  getIngredientControl(index: number, controlName: string): FormControl {
    return (this.ingredients.controls[index] as FormGroup)?.controls[controlName] as FormControl;
  }

  removeIngredient(index: number) {
    // Remove the ingredient control at the specified index
    this.ingredients.removeAt(index);
  }

  submitForm() {
    if (this.dishForm.valid) {
      const filename : string = this.dishForm.controls['filename'].value;
      const descriptions : string = this.dishForm.controls['descriptions'].value;
      console.log(this.dishForm.controls['descriptions'].value)
      const listIngredient : any[] = this.dishForm.controls['ingredients'].value;
      const dishType : string= this.dishForm.controls['saladType'].value;
      this.createDish.emit({ filename,descriptions, list: listIngredient, type: dishType });
      this.dishForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  // Helper getter for the ingredients form array
  get ingredients() {
    return this.dishForm.get('ingredients') as FormArray;
  }
}
