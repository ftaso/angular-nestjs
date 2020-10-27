import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcretionComponent } from './excretion.component';

const routes: Routes = [
  { path: '', component: ExcretionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcretionRoutingModule { }
