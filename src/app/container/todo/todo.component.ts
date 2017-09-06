import { Component, OnInit } from '@angular/core';
import {Todo}  from '../shared/todo';
import {todos} from '../shared/data';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  todos: Todo[] = todos;

  public create(title: string) {
    const todo = new Todo(title);
    this.todos.push(todo);

  }

}
