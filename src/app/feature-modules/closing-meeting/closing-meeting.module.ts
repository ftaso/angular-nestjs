import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClosingMeetingRoutingModule } from './closing-meeting-routing.module';
import { ClosingMeetingComponent } from './closing-meeting.component';
import { SharedModule } from '../../shared/shared.module';
import { HandingOverHttpHandlerService } from './services/handing-over-http-handler.service';
import { HandingOverStoreService } from './store/handing-over-store.service';
import { FormsModule } from '@angular/forms';
import { HandingOverComponent } from './handing-over/handing-over.component';


@NgModule({
  declarations: [
    ClosingMeetingComponent,
    HandingOverComponent
  ],
  imports: [
    CommonModule,
    ClosingMeetingRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    HandingOverHttpHandlerService,
    HandingOverStoreService,
  ]
})
export class ClosingMeetingModule { }
