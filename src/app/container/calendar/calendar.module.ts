import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { DaysModule }        from './days/days.module';
import { NavbarModule }      from './navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    DaysModule,
  ],
  declarations: [CalendarComponent],
  exports:      [CalendarComponent]
})
export class CalendarModule { }
