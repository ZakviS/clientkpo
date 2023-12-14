import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish,DishSearchRequest, DishResponse,DishDto, RestResponse } from './api.model';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';



@Injectable({providedIn: 'root'})
export class ApiService {
  private apiServerUrl = environment.SERVER_URL;
  constructor(private http: HttpClient){}

  public createBinaryDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.apiServerUrl}/dish/createBinaryDish`, dish);
  }

  public createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.apiServerUrl}/dish/createDish`, dish);
  }

  deleteDish(filename: string): Observable<any> {
    const queryParams = { filename: filename };
    return this.http.delete<any>(`${this.apiServerUrl}/dish/delete`, { params: queryParams });
  }

  editBinaryDish(dish: Dish): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/dish/editBinaryDish`, dish);
  }

  editDish(dish: Dish): Observable<any> {
    const url = `${this.apiServerUrl}/dish/editDish`;
    return this.http.put<any>(url, dish);
  }


  getAllDishes(dishSearchRequest: DishSearchRequest): Observable<DishResponse> {
    return this.http.post<DishResponse>(`${this.apiServerUrl}/dish/getAll`,dishSearchRequest);
  }


  getBinaryDish(filename: string): Observable<DishDto> {
    const queryParams = { filename: filename };
    const url = `${this.apiServerUrl}/dish/getBinaryDish`;
    return this.http.get<DishDto>(url, { params: queryParams });
  }


  getDish(filename: string): Observable<DishDto> {
    const queryParams = { filename: filename };
    const url = `${this.apiServerUrl}/dish/getDish`;
    return this.http.get<DishDto>(url, { params: queryParams });
  }
}
