import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceSheetRoutingModule } from './service-sheet-routing.module';
import { ServiceSheetComponent } from './service-sheet.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ServiceSheetStoreService } from './store/service-sheet-store.service';
import { ServiceSheetHttpHandlerService } from './services/service-sheet-http-handler.service';
import { CareReceiverStoreService } from 'src/app/master-modules/care-receiver/store/care-receiver-store.service';
import { ServiceTagHttpHandlerService } from 'src/app/master-modules/service-tag/services/service-tag-http-handler.service';
import { TimeFixedServiceComponent } from './components/time-fixed-service/time-fixed-service.component';
import { TimeFixedServiceHttpHandlerService } from './services/time-fixed-service-http-handler.service';
import { RemarkComponent } from './components/remark/remark.component';
import { ServiceDetailStoreService } from 'src/app/master-modules/service-detail/store/service-detail-store.service';



@NgModule({
  declarations: [
    ServiceSheetComponent,
    TimeFixedServiceComponent,
    RemarkComponent
  ],
  imports: [
    CommonModule,
    ServiceSheetRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    ServiceSheetStoreService,
    ServiceSheetHttpHandlerService,
    CareReceiverStoreService,
    ServiceTagHttpHandlerService,
    TimeFixedServiceHttpHandlerService,
    ServiceDetailStoreService
  ]
})
export class ServiceSheetModule { }
