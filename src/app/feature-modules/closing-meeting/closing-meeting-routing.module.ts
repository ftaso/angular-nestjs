import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClosingMeetingComponent } from './closing-meeting.component';

const routes: Routes = [
  { path: '', component: ClosingMeetingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosingMeetingRoutingModule {}
