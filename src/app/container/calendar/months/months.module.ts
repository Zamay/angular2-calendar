import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';

import { MonthsComponent } from './months.component';

@NgModule({
  imports:      [CommonModule],
  declarations: [MonthsComponent],
  exports:      [MonthsComponent]
})
export class MonthsModule { }
