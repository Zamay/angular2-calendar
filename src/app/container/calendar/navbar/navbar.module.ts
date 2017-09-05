import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { NavbarComponent }  from './navbar.component';
import { WeekdaysModule }   from './weekdays/weekdays.module';
import { MonthsModule }     from './months/months.module';

@NgModule({
  imports: [
    CommonModule,
    MonthsModule,
    WeekdaysModule
  ],
  declarations: [NavbarComponent],
  exports:      [NavbarComponent]
})
export class NavbarModule { }
