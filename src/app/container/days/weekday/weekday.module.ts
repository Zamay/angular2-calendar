import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { WeekdayComponent } from './weekday.component';
import { ModalModule }      from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [WeekdayComponent],
  exports:      [WeekdayComponent]
})
export class WeekdayModule { }
