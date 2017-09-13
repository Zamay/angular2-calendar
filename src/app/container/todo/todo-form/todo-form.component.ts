import { Component,
         Output,
         EventEmitter,
         OnInit,
         OnDestroy }    from '@angular/core';
import { FormControl,
         FormGroup,
         Validators }   from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { DateService }                 from '../../services/date.service';
import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';
import { TodoService }                 from '../../services/todo.service';

@Component({
  moduleId: module.id,
  selector:    'app-todo-form',
  templateUrl: 'todo-form.component.html',
  styleUrls:   ['todo-form.component.css']
})

export class TodoFormComponent implements OnInit, OnDestroy {

  public todoForm:     FormGroup;
  public subscription: Subscription;
  public selectedDay:  any;
  public notes:        any;
  public passDay:      boolean;
  constructor(
    private dateService: DateService,
    private todoService: TodoService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {
    this.todoForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ])
    });
    this.selectedDay = this.dateService.currSelecDay();
    this.notes = this.todoService.getNotesDay(this.selectedDay) || [];
  }

  ngOnInit() {
    this.subscription = this.shareableStreamStoreService.getStream('SelectedDay')
      .asObservable()
      .subscribe(value => {
        this.passDay = value[4];
        this.selectedDay = value;
        this.notes = this.todoService.getNotesDay(value) || [];
      });
  }

  public onSubmit() {
    const date = new Date();
    const time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

    this.notes.push({
      'title': this.todoForm.value.title,
      'time': time,
      'completed': false
    });
    this.shareableStreamStoreService.emit('notes' ,
      this.todoService.setNotesDay(this.selectedDay, JSON.stringify(this.notes)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
