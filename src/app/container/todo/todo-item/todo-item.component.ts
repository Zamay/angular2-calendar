import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "../../shared/todo";
@Component({
    moduleId: module.id,
    selector: 'app-todo-item',
    templateUrl: 'todo-item.component.html',
    styleUrls: ['todo-item.component.css']
})

export class TodoItemComponent {
    // todo - это свойство !
    @Input() todo: Todo;
    @Output() delete = new EventEmitter();

    public toggle() {
        this.todo.completed = !this.todo.completed;
    }

    public onDelete() {
        this.delete.emit(this.todo);
    }
}
