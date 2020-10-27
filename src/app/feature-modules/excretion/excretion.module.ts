import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcretionRoutingModule } from './excretion-routing.module';
import { ExcretionComponent } from './excretion.component';
import { SharedModule } from '../../shared/shared.module';
import { ExcretionHttpHandlerService } from './services/excretion-http-handler.service';
import { ExcretionStoreService } from './store/excretion-store.service';
import { StateComponent } from './components/state/state.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExcretionComponent,
    StateComponent
  ],
  imports: [
    CommonModule,
    ExcretionRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ExcretionHttpHandlerService,
    ExcretionStoreService,
  ]
})
export class ExcretionModule { }
