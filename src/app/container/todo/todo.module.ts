import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,
  ReactiveFormsModule}  from '@angular/forms';

import { TodoComponent }     from './todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListCOmponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Ng2IziToastModule } from 'ng2-izitoast'
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2IziToastModule
  ],
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoListCOmponent,
    TodoItemComponent
  ],
  exports: [TodoComponent]
})
export class TodoModule { }
