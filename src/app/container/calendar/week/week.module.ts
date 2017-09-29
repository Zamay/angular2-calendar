import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { WeeksComponent } from './week.component';
import { WeekdayModule }  from '../weekday/weekday.module';

@NgModule({
  imports: [
    CommonModule,
    WeekdayModule
  ],
  declarations: [WeeksComponent],
  exports:      [WeeksComponent]
})
export class WeekModule { }
