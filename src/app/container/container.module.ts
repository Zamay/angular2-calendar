import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { ContainerComponent } from './container.component';
import { HeaderModule }       from './header/header.module';
import { TodoModule }         from './todo/todo.module';
import { CalendarModule }     from './calendar/calendar.module';

import { DateService }                 from './services/date.service';
import { ShareableStreamStoreService } from './services/shareable-stream-store.service';
import { LocalStorageService }         from './services/local-storage-service.service';


@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    TodoModule,
    CalendarModule
  ],
  declarations: [ContainerComponent],
  exports:      [ContainerComponent],
  providers:    [DateService, ShareableStreamStoreService, LocalStorageService]
})
export class ContainerModule { }
