import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintServiceSheetComponent} from './print-service-sheet.component';


const routes: Routes = [
  { path: '', component: PrintServiceSheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintServiceSheetRoutingModule {}
