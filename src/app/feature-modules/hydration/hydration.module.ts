import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HydrationRoutingModule } from './hydration-routing.module';
import { HydrationComponent } from './hydration.component';
import { SharedModule } from '../../shared/shared.module';
import { CollectComponent } from './components/collect/collect.component';
import { HydrationHttpHandlerService } from './services/hydration-http-handler.service';
import { HydrationStoreService } from './store/hydration-store.service';
import { StaffNamePipe } from 'src/app/shared/pipes/staff-name.pipe';
import { FormsModule } from '@angular/forms';
import { NumHydratePipe } from './pipes/num-hydrate.pipe';


@NgModule({
  declarations: [HydrationComponent, CollectComponent, NumHydratePipe],
  imports: [
    CommonModule,
    HydrationRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    HydrationHttpHandlerService,
    HydrationStoreService,
  ]
})
export class HydrationModule { }
