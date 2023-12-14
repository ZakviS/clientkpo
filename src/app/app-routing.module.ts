import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishComponent } from './dish/dish.component';

const appRours: Routes = [
    {path: '', component: DishComponent},
    {path: 'salad', component: DishComponent},
  ]

@NgModule({
  imports: [    RouterModule.forRoot(appRours)  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
