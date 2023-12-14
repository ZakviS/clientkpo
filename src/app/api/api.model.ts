/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-12-05 20:49:53.

export interface RestApplication {

  /**
   * HTTP POST /salad/createBinaryDish
   * Java method: com.example.chefkpo.Controller.DishController.createBinaryDish
   */
  createBinaryDish(dish: Dish): RestResponse<any>;

  /**
   * HTTP POST /salad/createDish
   * Java method: com.example.chefkpo.Controller.DishController.createDish
   */
  createDish(dish: Dish): RestResponse<any>;

  /**
   * HTTP DELETE /salad/delete
   * Java method: com.example.chefkpo.Controller.DishController.delete
   */
  delete(queryParams: { filename: string; }): RestResponse<any>;

  /**
   * HTTP PUT /salad/editBinaryDish
   * Java method: com.example.chefkpo.Controller.DishController.editBinaryDish
   */
  editBinaryDish(dish: Dish): RestResponse<any>;

  /**
   * HTTP PUT /salad/editDish
   * Java method: com.example.chefkpo.Controller.DishController.editDish
   */
  editDish(dish: Dish): RestResponse<any>;

  /**
   * HTTP POST /salad/getAll
   * Java method: com.example.chefkpo.Controller.DishController.getAll
   */
  getAll(dishSearchRequest: DishSearchRequest): RestResponse<DishResponse>;

  /**
   * HTTP GET /salad/getBinaryDish
   * Java method: com.example.chefkpo.Controller.DishController.getBinaryDish
   */
  getBinaryDish(queryParams: { filename: string; }): RestResponse<DishDto>;

  /**
   * HTTP GET /salad/getDish
   * Java method: com.example.chefkpo.Controller.DishController.getDish
   */
  getDish(queryParams: { filename: string; }): RestResponse<DishDto>;
}

export interface Ingredient extends Serializable {
  name: string;
  weight: number;
  calories: number;
}

export interface IngredientDto {
  name: string;
  weight: number;
  calories: number;
}

export interface Dish {
  filename: string;
  listIngredient: Ingredient[];
  descriptions: string;
}

export interface DishDto {
  dish: Ingredient[];
}

export interface DishEntity {
  id: number;
  filename: string;
  filenameWithoutExt: string;
  descriptions : string;
}

export interface DishResponse {
  dishes: DishEntity[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface DishSearchRequest {
  page: number;
  elementPerPage: number;
  direction: string;
  key: string;
}

export interface Serializable {
}

export type RestResponse<R> = Promise<R>;


