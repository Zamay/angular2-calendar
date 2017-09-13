import { Component,
         Input,
         Output,
         EventEmitter }                from '@angular/core';

import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';
@Component({
  moduleId: module.id,
  selector:    'app-todo-item',
  templateUrl: 'todo-item.component.html',
  styleUrls:   ['todo-item.component.css']
})

export class TodoItemComponent {
  @Input()  todo: any;
  @Output() delete = new EventEmitter();

  constructor(private shareableStreamStoreService: ShareableStreamStoreService) { }

  public onToggle() {
    this.todo.completed = !this.todo.completed;
    this.shareableStreamStoreService.emit('toggle' , this.todo.completed);
  }

  public onDelete() {
    this.delete.emit(this.todo);
  }
}
