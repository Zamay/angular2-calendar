import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { WeekdayComponent } from './weekday.component';

@NgModule({
  imports:      [CommonModule],
  declarations: [WeekdayComponent],
  exports:      [WeekdayComponent]
})
export class WeekdayModule { }
