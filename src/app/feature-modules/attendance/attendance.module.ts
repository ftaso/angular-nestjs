import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { SharedModule } from '../../shared/shared.module';
import { RecordHttpHandlerService } from './services/record-http-handler.service';
import { RecordStoreService } from './store/record-store.service';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AttendanceComponent, DailyAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    RecordHttpHandlerService,
    RecordStoreService
  ]
})
export class AttendanceModule { }
