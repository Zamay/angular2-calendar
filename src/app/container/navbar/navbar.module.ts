import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { NavbarComponent }  from './navbar.component';
import { NavigationModule } from './navigation/navigation.module';
import { WeekdaysModule }   from './weekdays/weekdays.module';
import { MonthsModule }     from './months/months.module';

@NgModule({
  imports: [
    CommonModule,
    MonthsModule,
    WeekdaysModule,
    NavigationModule
  ],
  declarations: [NavbarComponent],
  exports:      [NavbarComponent]
})
export class NavbarModule { }
