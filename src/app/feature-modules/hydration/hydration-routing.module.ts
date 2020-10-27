import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HydrationComponent } from './hydration.component';

const routes: Routes = [
  { path: '', component: HydrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HydrationRoutingModule { }
