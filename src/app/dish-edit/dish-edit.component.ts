// dish-edit.component.ts
import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dish} from '../api/api.model';

@Component({
  selector: 'app-salad-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnChanges {
  @Input() dish: Dish;
  @Output() saveDish = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm: FormGroup;

  filename: string;
  descriptions : string

  constructor(private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      filename: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      descriptions: ['', Validators.required],
    });

  }

  getFileExtension(fileName: string): string {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  }

  ngOnChanges() {
    this.editForm.reset();
    if (this.dish && this.dish.listIngredient && Array.isArray(this.dish.listIngredient)) {
      const formattedDish = {
        filename: this.dish.filename,
        descriptions : this.dish.descriptions,
        ingredients: this.formBuilder.array([]),
      };
      this.filename = formattedDish.filename;
      this.descriptions = formattedDish.descriptions;

      this.dish.listIngredient.forEach(ingredient => {
        if (ingredient && typeof ingredient === 'object') {
          const formGroup = this.formBuilder.group({
            name: [ingredient.name, Validators.required],
            weight: [ingredient.weight, Validators.required],
            calories: [ingredient.calories, Validators.required]
          });

          (formattedDish.ingredients as FormArray).push(formGroup);
        }
      });

      this.editForm.setControl('ingredients', formattedDish.ingredients);
      this.editForm.patchValue({
        filename: formattedDish.filename,
        descriptions : formattedDish.descriptions
      });

    }
  }

  addIngredient() {
    // Получите контрол для массива ингредиентов
    const ingredientsArray = this.editForm.get('ingredients') as FormArray;

    // Добавьте новый контрол для ингредиента в массив
    ingredientsArray.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        weight: [0, [Validators.required, Validators.min(0)]],
        calories: [0, [Validators.required, Validators.min(0)]]
      })
    );

    // Обновите валидность формы
    this.editForm.updateValueAndValidity();
  }

  getIngredientControl(index: number, controlName: string): FormControl {
    return (this.ingredients.controls[index] as FormGroup)?.controls[controlName] as FormControl;
  }

  get ingredients() {
    return this.editForm.get('ingredients') as FormArray;
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  save() {
    if (this.editForm.valid) {
      const filename: string = this.editForm.controls['filename'].value;
      const descriptions: string = this.editForm.controls['descriptions'].value;
      const listIngredient: any[] = this.editForm.controls['ingredients'].value;
      console.log(descriptions)
      const saladType: string = this.getFileExtension(filename);
      this.saveDish.emit({filename,descriptions, list: listIngredient, type: saladType});
      this.editForm.reset();
    }
  }

  cancel() {
    this.cancelEdit.emit();
    this.editForm.reset();
  }
}
