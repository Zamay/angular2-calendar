import {Component, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../services/date.service";
import {ShareableStreamStoreService} from "../../services/shareable-stream-store.service";
import {Subscription} from "rxjs/Subscription";
import {TodoService} from "../../services/todo.service";

@Component({
  moduleId: module.id,
  selector: 'app-todo-form',
  templateUrl: 'todo-form.component.html',
  styleUrls: ['todo-form.component.css']
})

export class TodoFormComponent implements OnInit, OnDestroy {

  @Output() add = new EventEmitter();
  public todoForm:     FormGroup;
  public subscription: Subscription;
  public selectedDay:  any;
  public notes: any;
  constructor(
    private dateServive: DateService,
    private todoServive: TodoService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {
    this.todoForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ])
    });
    this.selectedDay = this.dateServive.currSelecDay();
  }

  ngOnInit() {
    this.subscription = this.shareableStreamStoreService.getStream('SelectedDay')
      .asObservable()
      .subscribe(value => this.selectedDay = value);

    this.notes = this.todoServive.getNotesDay(this.selectedDay) || [];

  }

  public onSubmit() {
    let date = new Date();
    let time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

    this.notes.push({
      'title': this.todoForm.value.title,
      'time': time,
      'completed': false
    });

    this.shareableStreamStoreService.emit('notes' , this.todoServive.setNotesDay(this.selectedDay, JSON.stringify(this.notes)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
