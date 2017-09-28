import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MonthComponent} from "./month.component";
import {WeekModule} from "../week/week.module";

@NgModule({
  imports: [
    CommonModule,
    WeekModule
  ],
  declarations: [MonthComponent],
  exports: [MonthComponent]
})
export class MonthModule { }
