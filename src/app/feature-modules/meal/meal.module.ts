import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealRoutingModule } from './meal-routing.module';
import { MealComponent } from './meal.component';
import { SharedModule } from '../../shared/shared.module';
import { MealStoreService } from './store/meal-store.service';
import { MealHttpHandlerService } from './services/meal-http-handler.service';
import { MealTypeComponent } from './components/meal-type/meal-type.component';
import { ProportionComponent } from './components/proportion/proportion.component';
import { RemarkComponent } from './components/remark/remark.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [MealComponent, MealTypeComponent, ProportionComponent, RemarkComponent, AddMealComponent],
  imports: [
    CommonModule,
    MealRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    MealStoreService,
    MealHttpHandlerService,
  ]
})
export class MealModule { }
