import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VitalRoutingModule } from './vital-routing.module';
import { VitalComponent } from './vital.component';
import { SharedModule } from '../../shared/shared.module';
import { RemarkComponent } from './components/remark/remark.component';
import { DigitComponent } from './components/digit/digit.component';
import { FormsModule } from '@angular/forms';
import { VitalHttpHandlerService } from './services/vital-http-handler.service';
import { VitalStoreService } from './store/vital-store.service';
import { TimeComponent } from './components/time/time.component';


@NgModule({
  declarations: [VitalComponent, RemarkComponent, DigitComponent, TimeComponent],
  imports: [
    CommonModule,
    VitalRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    VitalHttpHandlerService,
    VitalStoreService
  ]
})
export class VitalModule { }
