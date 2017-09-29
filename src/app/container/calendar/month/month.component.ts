import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { DateService }                  from '../../services/date.service';
import { LocalStorageService }          from '../../services/local-storage-service.service';
import { ShareableStreamStoreService }  from '../../services/shareable-stream-store.service';

@Component({
  selector:    'app-month',
  templateUrl: './month.component.html',
  styleUrls:   ['./month.component.css']
})
export class MonthComponent implements OnInit, OnDestroy {

  public weeks:       Array<any>;
  public valueStatus: any;
  public subBtnPrev:  Subscription;
  public subBtnNext:  Subscription;
  constructor(
    private dateServive:      DateService,
    private localStorageSer:  LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.valueStatus = this.localStorageSer.getData('selectedMY');
    this.weeks = this.dateServive.getDaysOfMonth(this.valueStatus['year'].number, this.valueStatus['month'].number);

    this.subBtnPrev = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.weeks = value);

    this.subBtnNext = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.weeks = value);
  }
  ngOnDestroy() {
    this.subBtnPrev.unsubscribe();
    this.subBtnNext.unsubscribe();
  }
}
