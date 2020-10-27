import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { SharedModule } from '../../shared/shared.module';
import { StaffHttpHandlerService } from './services/staff-http-handler.service';
import { StaffStoreService } from './store/staff-store.service';
import { FormsModule } from '@angular/forms';
import { SelectedStaffPipe } from './pipes/selected-staff.pipe';
import { StaffEditDialogComponent } from './staff-edit-dialog/staff-edit-dialog.component';
import { SessionService } from 'src/app/store/session.service';
import { DialogStateService } from 'src/app/services/dialog-state.service';
import { StaffRegistDialogComponent } from './staff-regist-dialog/staff-regist-dialog.component';
import { InputStaffChangeComponent } from './input-staff-change/input-staff-change.component';

@NgModule({
  declarations: [
    StaffComponent,
    SelectedStaffPipe,
    StaffEditDialogComponent,
    StaffRegistDialogComponent,
    InputStaffChangeComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    StaffStoreService,
    StaffHttpHandlerService,
    SessionService,
    DialogStateService
  ]

})
export class StaffModule { }
