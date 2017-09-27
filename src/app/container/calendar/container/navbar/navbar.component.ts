import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { DateService }                  from '../../../services/date.service';
import { ShareableStreamStoreService }  from '../../../services/shareable-stream-store.service';
import {LocalStorageService} from "../../../services/local-storage-service.service";

@Component({
  selector:    'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:   ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public currMonth:     Array<any>;

  public subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService,
    private localStorageSer: LocalStorageService
  ) {

  }

  ngOnInit() {

    this.currMonth = this.dateServive.showCurrMonth() || ['Month' , 'selectedDay'];
    console.log(this.currMonth);

    this.subscription = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.currMonth = value);

    this.subscription = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.currMonth = value);

    this.subscription = this.shareableStreamStoreService.getStream('selectMonth')
      .asObservable()
      .subscribe(value => this.currMonth = value);
  }

  public btnPrev() {
    this.shareableStreamStoreService.emit('btnPrev' , this.dateServive.previousMonth());
  }

  public btnNext() {
    this.shareableStreamStoreService.emit('btnNext' , this.dateServive.nextMonth());
  }

  public onSelectedMonth() {
    /* делаем все false
    * поле year делаем true */
    const value = this.localStorageSer.getData('selectedMY');
    for (const i in value) {
      if (value[i].active === true)
        value[i].active = false;
    }
    value['month'].active = true;
    this.shareableStreamStoreService.emit('SelectedMY', value );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
