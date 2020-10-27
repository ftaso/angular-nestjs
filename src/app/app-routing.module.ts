import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { AdminGuard } from './guard/admin.guard';
import { DeveloperGuard } from './guard/developer.guard';

const routes: Routes = [
  // 管理者のみ
  {
    path: 'staff', data: { animation: 'staff' },
    loadChildren: () => import('./master-modules/staff/staff.module').then((m) => m.StaffModule),
    canLoad: [AdminGuard],
    canActivate: [AuthGuard],
  },
  // 管理者のみ
  {
    path: 'care-receiver', data: { animation: 'care-receiver' },
    loadChildren: () => import('./master-modules/care-receiver/care-receiver.module').then((m) => m.CareReceiverModule),
    canLoad: [AdminGuard],
    canActivate: [AuthGuard]
  },
  // 開発者のみ
  {
    path: 'service-tag', data: { animation: 'service-tag' },
    loadChildren: () => import('./master-modules/service-tag/service-tag.module').then((m) => m.ServiceTagModule),
    canLoad: [DeveloperGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'service-detail', data: { animation: 'service-detail' },
    loadChildren: () => import('./master-modules/service-detail/service-detail.module').then((m) => m.ServiceDetailModule),
    canLoad: [DeveloperGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'meal', data: { animation: 'meal' },
    loadChildren: () => import('./feature-modules/meal/meal.module').then((m) => m.MealModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vital', data: { animation: 'vital' },
    loadChildren: () => import('./feature-modules/vital/vital.module').then((m) => m.VitalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'excretion', data: { animation: 'excretion' },
    loadChildren: () => import('./feature-modules/excretion/excretion.module').then((m) => m.ExcretionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'hydration', data: { animation: 'hydration' },
    loadChildren: () => import('./feature-modules/hydration/hydration.module').then((m) => m.HydrationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance', data: { animation: 'attendance' },
    loadChildren: () => import('./feature-modules/attendance/attendance.module').then((m) => m.AttendanceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'closing-meeting', data: { animation: 'closingMeeting' },
    loadChildren: () => import('./feature-modules/closing-meeting/closing-meeting.module').then((m) => m.ClosingMeetingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'day-schedule', data: { animation: 'daySchedule' },
    loadChildren: () => import('./feature-modules/day-schedule/day-schedule.module').then((m) => m.DayScheduleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'service-sheet', data: { animation: 'serviceSheet' },
    loadChildren: () => import('./feature-modules/service-sheet/service-sheet.module').then((m) => m.ServiceSheetModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'print-service-sheet', data: { animation: 'printServiceSheet' },
    loadChildren: () => import('./feature-modules/print-service-sheet/print-service-sheet.module').then((m) => m.PrintServiceSheetModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login', data: { animation: 'login' },
    loadChildren: () => import('./feature-modules/login/login.module').then((m) => m.LoginModule),
    canLoad: [LoginGuard]
  },
  { path: '', redirectTo: 'attendance', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
