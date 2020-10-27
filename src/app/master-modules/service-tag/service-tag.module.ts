import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTagRoutingModule } from './service-tag-routing.module';
import { ServiceTagComponent } from './service-tag.component';
import { ServiceTagStoreService } from './store/service-tag-store.service';
import { ServiceTagHttpHandlerService } from './services/service-tag-http-handler.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ServiceTagEditDialogComponent } from './service-tag-edit-dialog/service-tag-edit-dialog.component';
import { DialogStateService } from '../../services/dialog-state.service';

@NgModule({
  declarations: [
    ServiceTagComponent,
    ServiceTagEditDialogComponent
  ],
  imports: [
    CommonModule,
    ServiceTagRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ServiceTagStoreService,
    ServiceTagHttpHandlerService,
    DialogStateService
  ]
})
export class ServiceTagModule { }
