import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealComponent } from '../meal/meal.component';
import { AuthGuard } from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: MealComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule { }
