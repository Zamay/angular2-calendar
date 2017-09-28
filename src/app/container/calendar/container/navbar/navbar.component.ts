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
  public subBtnPrev:  Subscription;
  public subBtnNext:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService,
    private localStorageSer: LocalStorageService
  ) {

  }

  ngOnInit() {

    // Повтор кода и очень много !!! TODO: Убрать !! Пиши нормально ...
    this.currMonth = this.localStorageSer.getData('selectedMY');
    this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];

    this.subBtnPrev = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => {
        this.currMonth = this.localStorageSer.getData('selectedMY');
        this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];
      });

    this.subBtnNext = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => {
        this.currMonth = this.localStorageSer.getData('selectedMY');
        this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];
      });

    this.subscription = this.shareableStreamStoreService.getStream('SelectedMY')
      .asObservable()
      .subscribe(value => {
        this.showMonth = true;
        this.currMonth = value;
        this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];
      });
  }

  public btnPrev() {
    this.currMonth = this.localStorageSer.getData('selectedMY');
    this.shareableStreamStoreService.emit('btnPrev',
      this.dateServive.previousMonth(
        this.currMonth['year'].number, this.currMonth['month'].number, this.currMonth['weeks'].active
      )
    );
  }

  public btnNext() {
    this.currMonth = this.localStorageSer.getData('selectedMY');
    this.shareableStreamStoreService.emit('btnNext',
      this.dateServive.nextMonth(
        this.currMonth['year'].number, this.currMonth['month'].number, this.currMonth['weeks'].active
      )
    );
  }

  public onSelectedMonth() {
    /* делаем все false => поле year делаем true */
    const value = this.localStorageSer.getData('selectedMY');
    for (const i in value) {
      if (value[i].active === true)
        value[i].active = false;
    }
    value['month'].active = true;
    this.localStorageSer.setData('selectedMY', value);
    this.shareableStreamStoreService.emit('SelectedMY', value );

    this.showMonth = false;                       // Показать или скрыть месяц в шаблоне
  }

  ngOnDestroy() {
    this.subBtnPrev.unsubscribe();
    this.subBtnNext.unsubscribe();
    this.subscription.unsubscribe();
  }

}
