import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ButtonComponent } from './components/button/button.component';
import { BooleanToCirclePipe } from './pipes/boolean-to-circle.pipe';
import { MaterialModule } from '../material/material.module';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { FormsModule } from '@angular/forms';
import { TimeHhmmPipe } from './pipes/time-hhmm.pipe';
import { NumberInputerComponent } from './components/number-inputer/number-inputer.component';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { StaffNamePipe } from './pipes/staff-name.pipe';
import { JpDatePipe } from './pipes/jp-date.pipe';
import { RecordTypeJpPipe } from './pipes/record-type-jp.pipe';
import { LabelIconButtonComponent } from './components/label-icon-button/label-icon-button.component';
import { TextRegisterComponent } from './components/text-register/text-register.component';

@NgModule({
  declarations: [
    AlertComponent,
    PageTitleComponent,
    ButtonComponent,
    BooleanToCirclePipe,
    IconButtonComponent,
    TimePickerComponent,
    TimeHhmmPipe,
    NumberInputerComponent,
    TemperaturePipe,
    StaffNamePipe,
    JpDatePipe,
    RecordTypeJpPipe,
    LabelIconButtonComponent,
    TextRegisterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    PageTitleComponent,
    ButtonComponent,
    BooleanToCirclePipe,
    MaterialModule,
    AlertComponent,
    IconButtonComponent,
    TimePickerComponent,
    TimeHhmmPipe,
    NumberInputerComponent,
    StaffNamePipe,
    JpDatePipe,
    RecordTypeJpPipe,
    LabelIconButtonComponent,
    TextRegisterComponent
  ]
})
export class SharedModule { }
