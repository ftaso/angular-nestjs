import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceDetailRoutingModule } from './service-detail-routing.module';
import { ServiceDetailEditDialogComponent } from './service-detail-edit-dialog/service-detail-edit-dialog.component';
import { ServiceDetailComponent } from './service-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ServiceDetailStoreService } from './store/service-detail-store.service';
import { ServiceDetailHttpHandlerService } from './services/service-detail-http-handler.service';
import { DialogStateService } from 'src/app/services/dialog-state.service';


@NgModule({
  declarations: [
    ServiceDetailComponent,
    ServiceDetailEditDialogComponent
  ],
  imports: [
    CommonModule,
    ServiceDetailRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ServiceDetailStoreService,
    ServiceDetailHttpHandlerService,
    DialogStateService
  ]
})
export class ServiceDetailModule { }

