import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { DateService }                  from '../../../services/date.service';
import { ShareableStreamStoreService }  from '../../../services/shareable-stream-store.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit, OnDestroy {
  public currMonth:     Array<any>;
  public subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {

  }

  ngOnInit() {
    this.currMonth = this.dateServive.showCurrMonth() || ['Month' , 'selectedDay'];

    this.subscription = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.currMonth = value);

    this.subscription = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.currMonth = value);
  }

  public btnPrev() {
    this.shareableStreamStoreService.emit('btnPrev' , this.dateServive.previousMonth());
  }

  public btnNext() {
    this.shareableStreamStoreService.emit('btnNext' , this.dateServive.nextMonth());
  }

  public selectedMonth() {
    this.shareableStreamStoreService.emit('selectedMonth', this.dateServive.getMonth())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
