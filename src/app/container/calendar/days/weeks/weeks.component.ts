import {Component, OnDestroy, OnInit} from '@angular/core';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';
import { Subscription }                from 'rxjs/Subscription';
import {TodoService} from "../../../services/todo.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css']
})
export class WeeksComponent implements OnInit, OnDestroy {

  public weeks: any;
  public subscription:  Subscription;
  public day:           any;
  public showNotes:     any;
  public arrNotes:      any;
  constructor(
    private dateServive: DateService,
    private todoService: TodoService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.weeks = this.dateServive.showCurrMonth()[3];
    this.day   = this.dateServive.showCurrMonth()[1];
    this.subscription = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => {
        this.weeks = value[2];
        this.showNote(value[0]);
      });

    this.subscription = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => {
        this.weeks = value[2];
        this.showNote(value[0]);
      });

    this.showNote(this.day);

    // TODO: изменять количество зематок при добавлении - сделать
    this.subscription = this.shareableStreamStoreService.getStream('notes')
      .asObservable()
      .subscribe(value => {
        console.log(value);
      });

  }

  public showNote(month) {
    this.arrNotes = [];
    for (let item = 0; item < this.weeks.length; item++) {
      for (let i of this.weeks[item]) {
        let notes = this.todoService.getNotesDay(['', month, i.day, i.year])
        if (notes !== null) {
          this.showNotes = {
            day: i.day,
            month: this.day[1],
            year: i.year,
            notes: notes
          };
          this.arrNotes.push(this.showNotes);
        }
      }
    }
  }

  ngOnDestroy() {
    if (isNullOrUndefined )
    this.subscription.unsubscribe();
  }
}
