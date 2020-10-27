import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VitalComponent} from './vital.component';
const routes: Routes = [
  {path: '', component: VitalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VitalRoutingModule { }
