import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayScheduleRoutingModule } from './day-schedule-routing.module';
import { DayScheduleComponent } from './day-schedule.component';
import { SharedModule } from '../../shared/shared.module';
import { DailyDayScheduleComponent } from './daily-day-schedule/daily-day-schedule.component';
import { DayScheduleHttpHandlerService } from './services/day-schedule-http-handler.service';
import { DayScheduleStoreService } from './store/day-schedule-store.service';
import { CareReceiverStoreService } from 'src/app/master-modules/care-receiver/store/care-receiver-store.service';


@NgModule({
  declarations: [
    DayScheduleComponent,
    DailyDayScheduleComponent
  ],
  imports: [
    CommonModule,
    DayScheduleRoutingModule,
    SharedModule
  ],
  providers:[
    DayScheduleHttpHandlerService,
    DayScheduleStoreService,
    CareReceiverStoreService
  ]
})
export class DayScheduleModule { }
