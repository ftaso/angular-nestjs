import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareReceiverRoutingModule } from './care-receiver-routing.module';
import { CareReceiverComponent } from './care-receiver.component';
import { SharedModule } from '../../shared/shared.module';
import { CareReceiverStoreService } from './store/care-receiver-store.service';
import { CareReceiverHttpHandlerService } from './services/care-receiver-http-handler.service';
import { CareReceiverEditDialogComponent } from './care-receiver-edit-dialog/care-receiver-edit-dialog.component';
import { DialogStateService } from '../../services/dialog-state.service';
import { SelectedCareReceiverPipe } from './pipe/selected-care-receiver.pipe';
import { FormsModule } from '@angular/forms';
import { CareReceiverRegistDialogComponent } from './care-receiver-regist-dialog/care-receiver-regist-dialog.component';

@NgModule({
  declarations: [
    CareReceiverComponent,
    CareReceiverEditDialogComponent,
    SelectedCareReceiverPipe,
    CareReceiverRegistDialogComponent,
  ],
  imports: [
    CommonModule,
    CareReceiverRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    CareReceiverStoreService,
    CareReceiverHttpHandlerService,
    DialogStateService
  ]
})
export class CareReceiverModule { }
