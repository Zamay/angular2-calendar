import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { LocalStorageService }          from '../services/local-storage-service.service';
import { ShareableStreamStoreService }  from '../services/shareable-stream-store.service';

@Component({
  selector:    'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls:   ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  public valueState:    any;
  public subscription:  Subscription;
  public selectY:       Subscription;
  public selectM:       Subscription;
  constructor (
    private localStorageSer: LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {

  }

  ngOnInit() {
    // Значение компонентов  true or false по умолчанию weeks = true
    this.valueState = this.localStorageSer.getData('selectedMY');

    this.selectM = this.shareableStreamStoreService.getStream('selectM')
      .asObservable()
      .subscribe(value => this.valueState = value);

    this.selectY = this.shareableStreamStoreService.getStream('selectY')
      .asObservable()
      .subscribe(value => this.valueState = value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.selectY.unsubscribe();
    this.selectM.unsubscribe();
  }
}
