import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayScheduleComponent} from './day-schedule.component';

const routes: Routes = [
  {path: '', component: DayScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayScheduleRoutingModule { }
