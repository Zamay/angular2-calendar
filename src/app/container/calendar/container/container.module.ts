import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ContainerComponent } from './container.component';

import { WeekModule }   from './week/week.module';
import { MonthModule }   from './month/month.module';
import { YearModule }   from './year/year.module';
import {NavbarModule}   from "./navbar/navbar.module";
import {WeeknameModule} from "./weekname/weekname.module";

@NgModule({
  imports: [
    CommonModule,
    WeekModule,
    MonthModule,
    YearModule,
    NavbarModule,
    WeeknameModule,
  ],
  declarations: [ContainerComponent],
  exports:      [ContainerComponent]
})
export class ContainerModule { }
