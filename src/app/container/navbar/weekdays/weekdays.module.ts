import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { WeekdaysComponent }  from './weekdays.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WeekdaysComponent],
  exports: [WeekdaysComponent],
})
export class WeekdaysModule { }
