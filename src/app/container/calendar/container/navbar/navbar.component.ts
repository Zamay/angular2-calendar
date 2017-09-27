import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { DateService }                  from '../../../services/date.service';
import { ShareableStreamStoreService }  from '../../../services/shareable-stream-store.service';
import {LocalStorageService} from "../../../services/local-storage-service.service";
import {MONTHS} from "../../../shared/cal.data";
import {isNullOrUndefined} from "util";

@Component({
  selector:    'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:   ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public currMonth: any;
  public showMonth: boolean = true;
  public Months: Array<string> = MONTHS;
  public subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService,
    private localStorageSer: LocalStorageService
  ) {

  }

  ngOnInit() {

    this.currMonth = this.localStorageSer.getData('selectedMY');
    this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];
    // this.currMonth['month'].number = this.Months[this.currMonth['month'].number]
    // this.currMonth = this.dateServive.showCurrMonth() || ['Month' , 'selectedDay'];
    // console.log(this.currMonth);


    this.subscription = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.currMonth = value);

    this.subscription = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.currMonth = value);

    this.subscription = this.shareableStreamStoreService.getStream('selectMonth')
      .asObservable()
      .subscribe(value => {
        this.showMonth = true;
        this.currMonth = value;
      });
  }

  public btnPrev() {
    this.shareableStreamStoreService.emit('btnPrev' , this.dateServive.previousMonth());
  }

  public btnNext() {
    this.shareableStreamStoreService.emit('btnNext' , this.dateServive.nextMonth());
  }

  public onSelectedMonth() {
    // Показать или скрыть месяц
    this.showMonth = false;

    /* делаем все false => поле year делаем true */
    const value = this.localStorageSer.getData('selectedMY');
    for (const i in value) {
      if (value[i].active === true)
        value[i].active = false;
    }
    value['month'].active = true;
    this.localStorageSer.setData('selectedMY', value);
    this.shareableStreamStoreService.emit('SelectedMY', value );
  }

  ngOnDestroy() {
    if (isNullOrUndefined(this.subscription))
      this.subscription.unsubscribe();
  }

}
