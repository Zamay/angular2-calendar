import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ContainerComponent } from './container.component';

import { WeekModule }   from './week/week.module';
import { MonthsModule }   from './months/months.module';
import { YearModule }   from './year/year.module';
import {NavbarModule}   from "./navbar/navbar.module";
import {WeeknameModule} from "./weekname/weekname.module";
import {MonthModule} from "./month/month.module";

@NgModule({
  imports: [
    CommonModule,
    WeekModule,
    MonthsModule,
    YearModule,
    NavbarModule,
    WeeknameModule,
    MonthModule
  ],
  declarations: [ContainerComponent],
  exports:      [ContainerComponent]
})
export class ContainerModule { }
