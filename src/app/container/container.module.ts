import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { ContainerComponent } from './container.component';
import { HeaderModule }       from './header/header.module';
import { CalendarModule }     from './calendar/calendar.module';
import { TodoModule }         from './todo/todo.module';

import { DateService }                 from './services/date.service';
import { ShareableStreamStoreService } from './services/shareable-stream-store.service';
import { TodoService }                 from './services/todo.service';


@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    CalendarModule,
    TodoModule
  ],
  declarations: [ContainerComponent],
  exports:      [ContainerComponent],
  providers:    [DateService, ShareableStreamStoreService, TodoService]
})
export class ContainerModule { }
