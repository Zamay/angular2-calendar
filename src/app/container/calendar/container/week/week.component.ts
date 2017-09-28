import {Component,
        OnDestroy,
        OnInit }             from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Subscription }      from 'rxjs/Subscription';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';
import { LocalStorageService }                 from '../../../services/local-storage-service.service';
import {MONTHS} from "../../../shared/cal.data";

@Component({
  selector:    'app-week',
  templateUrl: './week.component.html',
  styleUrls:   ['./week.component.css']
})
export class WeeksComponent implements OnInit, OnDestroy {

  public weeks:         any;
  public day:           any;
  public showNotes:     any;
  public arrNotes:      any;
  public daysOfMonth:   any;

  public Months: Array<string> = MONTHS;
  public subscription:  Subscription;
  constructor(

    private dateServive: DateService,
    private localStorageSer: LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    const valueState = this.localStorageSer.getData('selectedMY');
    this.day =  this.Months[valueState['month'].number];  // это месяц .. почему то day у него имя ?!

    this.weeks = this.dateServive.getDaysOfMonth(valueState['year'].number, valueState['month'].number);

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
    this.daysOfMonth = [];
    let dayOfMonth = {};
    for (let item = 0; item < this.weeks.length; item++) {
      for (const i of this.weeks[item]) {
        const notes = this.localStorageSer.getLocalStorage(['', month, i.day, i.year]);
        if (notes !== null) {
          this.showNotes = {
            day: i.day,
            month: this.day[1],
            year: i.year,
            notes: notes
          };
          this.arrNotes.push(this.showNotes);
        }

        dayOfMonth = {
          day: i.day,
          active: false
        };
        this.daysOfMonth.push(dayOfMonth);
      }
    }
    console.log(this.daysOfMonth);
  }

  ngOnDestroy() {
    if (isNullOrUndefined ) {
      this.subscription.unsubscribe();
    }
  }
}
