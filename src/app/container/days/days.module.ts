import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { DaysComponent }    from "./days.component";
import { WeeksModule }      from "./weeks/weeks.module";

@NgModule({
  imports: [
    CommonModule,
    WeeksModule
  ],
  declarations: [DaysComponent],
  exports:      [DaysComponent]
})
export class DaysModule { }
