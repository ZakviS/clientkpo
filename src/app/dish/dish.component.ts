import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

import {MatAccordion} from '@angular/material/expansion';
import {Dish, DishEntity, DishResponse, DishSearchRequest} from '../api/api.model';
import {ApiService} from '../api/api.service';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-employee',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
})

export class DishComponent implements OnInit {
  dish: Dish = {filename: '', listIngredient: [], descriptions : ""};
  dishEdit: Dish = {filename: '', listIngredient: [], descriptions : ""};

  public deleteDish: Dish = {filename: '', listIngredient: [], descriptions : ""};

  public dishes: DishEntity[];

  public currentFormId: string;

  public searchDish: DishSearchRequest = {page: 0, elementPerPage: 5, direction: "dsc", key: "filename"};

  editingDish: Dish | null;

  @ViewChild(MatAccordion) accordion: MatAccordion;


  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];

  public isAddFormOpen = false;

  constructor(private apiService: ApiService,public translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.getDishResponse();
    this.currentFormId = 'list'
  }

  toggleAddForm() {
    this.isAddFormOpen = !this.isAddFormOpen;
  }

  createDish(event: {filename: string,descriptions: string, list: any[], type: string}) {
    this.dish.filename = event.filename;
    this.dish.descriptions = event.descriptions;
    this.dish.listIngredient = event.list;
    if (event.type == 'txt'){
      this.dish.filename = this.dish.filename + ".txt";
      this.apiService.createDish(this.dish).subscribe(
        (response) => {
          this.getDishResponse();
          this.toggleAddForm(); // Close the form after successful creation
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else if(event.type == 'dat'){
      this.dish.filename = this.dish.filename + ".dat";
      this.apiService.createBinaryDish(this.dish).subscribe(
        (response) => {
          this.getDishResponse();
          this.toggleAddForm(); // Close the form after successful creation
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

  }

  getFileExtension(fileName: string): string {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  }

  showEditForm(dish: DishEntity) {
    if (this.getFileExtension(dish.filename) == 'txt') {
      this.apiService.getDish(dish.filename).subscribe(
        (createdDish) => {
          this.dishEdit.filename = dish.filename;
          this.dishEdit.descriptions = dish.descriptions;
          this.dishEdit.listIngredient = createdDish.dish;
          this.editingDish = this.dishEdit;
          console.log('Салат ', this.editingDish);
          console.log('descriptions ', dish.descriptions);

          },
        (error) => {
          console.error('Ошибка при получении:', error);
        }
      );
    }else if(this.getFileExtension(dish.filename) == 'dat'){
      this.apiService.getBinaryDish(dish.filename).subscribe(
        (createdSalad) => {
          this.dishEdit.filename = dish.filename;
          this.dishEdit.listIngredient = createdSalad.dish;
          this.editingDish = this.dishEdit;
          console.log('Салат успешно получен:', createdSalad);
        },
        (error) => {
          console.error('Ошибка при получении салата:', error);
        }
      );
    }
  }

  saveEditedDish(event: {filename: string,descriptions : string, list: any[], type: string}) {
    console.log("edit")
    this.dish.filename = event.filename;
    this.dish.descriptions = event.descriptions;
    this.dish.listIngredient = event.list;
    if (event.type == 'txt'){
      this.dish.filename = this.dish.filename;
      this.apiService.editDish(this.dish).subscribe(
        (response) => {
          this.getDishResponse();
          this.toggleAddForm(); // Close the form after successful creation
          this.editingDish = null;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else if(event.type == 'dat'){
      this.dish.filename = this.dish.filename;
      this.apiService.editBinaryDish(this.dish).subscribe(
        (response) => {
          this.getDishResponse();
          this.toggleAddForm(); // Close the form after successful creation
          this.editingDish = null;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  cancelEdit() {
    this.editingDish = null;
  }

  public getDishResponse(): void {
    this.searchDish.page = this.page - 1;
    this.searchDish.elementPerPage = this.pageSize;
    this.apiService.getAllDishes(this.searchDish).subscribe(
      (response: DishResponse) => {
        this.dishes = response.dishes;
        this.count = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getDishResponse();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getDishResponse();
  }

  public onDeleteDish(filename: string): void {
    this.apiService.deleteDish(filename).subscribe(
      (response: void) => {
        this.getDishResponse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(salad: DishEntity, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteDish.filename = salad.filename;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }


}


