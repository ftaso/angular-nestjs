import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintServiceSheetRoutingModule } from './print-service-sheet-routing.module';
import { PrintServiceSheetComponent } from './print-service-sheet.component';
import { SharedModule } from '../../shared/shared.module';
import { ServiceSheetStoreService } from '../service-sheet/store/service-sheet-store.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrintServiceSheetComponent
  ],
  imports: [
    CommonModule,
    PrintServiceSheetRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ServiceSheetStoreService
  ]
})
export class PrintServiceSheetModule { }