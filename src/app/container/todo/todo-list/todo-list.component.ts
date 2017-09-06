import {Component, Input} from "@angular/core";
import {Todo} from "../../shared/todo";

@Component({
    moduleId: module.id,
    selector: 'app-todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css']
})

export class TodoListCOmponent {
    @Input() todos: Todo[];

    public toggle(todo: Todo) {
        todo.completed = !todo.completed;
    }

    public delete(todo: Todo){
        let index = this.todos.indexOf(todo);

        if (index > -1 ) {
            this.todos.splice(index, 1);
        }
    }

}
