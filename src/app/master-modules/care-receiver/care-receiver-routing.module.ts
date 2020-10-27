import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareReceiverComponent } from './care-receiver.component';

const routes: Routes = [
  { path: '', component: CareReceiverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareReceiverRoutingModule { }
