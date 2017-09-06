import {Component, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../services/date.service";
import {ShareableStreamStoreService} from "../../services/shareable-stream-store.service";
import {Subscription} from "rxjs/Subscription";

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

  constructor(
    private dateServive: DateService,
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
  }

  public onSubmit() {
    console.log(this.selectedDay);
    localStorage.setItem(this.selectedDay[2] + '/' + this.selectedDay[1] + '/' + this.selectedDay[3], this.todoForm.value.title);

    // this.add.emit(this.todoForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
