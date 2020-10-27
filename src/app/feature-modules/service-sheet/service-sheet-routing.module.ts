import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceSheetComponent} from './service-sheet.component';

const routes: Routes = [
  { path: '', component: ServiceSheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSheetRoutingModule {}
