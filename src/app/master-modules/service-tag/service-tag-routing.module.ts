import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceTagComponent } from './service-tag.component';

const routes: Routes = [
  { path: '', component: ServiceTagComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceTagRoutingModule { }
