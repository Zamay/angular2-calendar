import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { ContainerComponent } from './container.component';
import { HeaderModule }       from './header/header.module';
import { CalendarModule }     from './calendar/calendar.module';

import { DateService }                 from './services/date.service';
import { ShareableStreamStoreService } from './services/shareable-stream-store.service';


@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    CalendarModule
  ],
  declarations: [ContainerComponent],
  exports:      [ContainerComponent],
  providers:    [DateService, ShareableStreamStoreService]
})
export class ContainerModule { }
