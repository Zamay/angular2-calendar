import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ShareableStreamStoreService} from "../../services/shareable-stream-store.service";
import {TodoService} from "../../services/todo.service";
import {DateService} from "../../services/date.service";
import {isNullOrUndefined} from "util";

@Component({
  moduleId: module.id,
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.css']
})

export class TodoListCOmponent implements OnInit, OnDestroy {

  public todos: any = [];
  public selectedDay: any;
  public subscription: Subscription;

  constructor(
    private shareableStreamStoreService: ShareableStreamStoreService,
    private todoService: TodoService,
    private dateService: DateService
  ) {
    this.selectedDay = this.dateService.currSelecDay();
    this.todos = this.todoService.getNotesDay(this.selectedDay) || [];
  }

  ngOnInit() {
    // получить текущий день
    this.subscription = this.shareableStreamStoreService.getStream('SelectedDay')
      .asObservable()
      .subscribe(value => {
        // console.log(value);
        this.selectedDay = value;
          this.todos = this.todoService.getNotesDay(value) || [];
        }
      );

    // запушить toggle
    this.subscription = this.shareableStreamStoreService.getStream('toggle')
      .asObservable()
      .subscribe(value => {
        this.todoService.setNotesDay(this.selectedDay, JSON.stringify(this.todos));
        }
      );

    // получить заметку
    this.subscription = this.shareableStreamStoreService.getStream('notes')
      .asObservable()
      .subscribe(value => {
        this.todos = value;
      });
  }

  public delete(todo) {
    let index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
    this.todoService.setNotesDay(this.selectedDay, JSON.stringify(this.todos));
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.subscription))
    this.subscription.unsubscribe();
  }
}
