import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { ContainerModule }   from './container/container.module';
@NgModule({
  imports: [
    CommonModule,
    ContainerModule,
  ],
  declarations: [CalendarComponent],
  exports:      [CalendarComponent]
})
export class CalendarModule { }
