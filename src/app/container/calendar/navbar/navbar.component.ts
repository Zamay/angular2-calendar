import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { DateService }                  from '../../services/date.service';
import { ShareableStreamStoreService }  from '../../services/shareable-stream-store.service';
import { LocalStorageService }          from "../../services/local-storage-service.service";

import { MONTHS }                       from "../../shared/cal.data";

@Component({
  selector:    'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:   ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public currMonth:   any;
  public showMonth:   boolean = true;
  public Months:      Array<string> = MONTHS;
  public selectM:     Subscription;
  public selectY:     Subscription;
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

    this.selectM = this.shareableStreamStoreService.getStream('selectM')
      .asObservable()
      .subscribe(value => {
        this.showMonth = true;
        this.currMonth = value;
        this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];
      });

    this.selectY = this.shareableStreamStoreService.getStream('selectY')
      .asObservable()
      .subscribe(value => {
        this.showMonth = false;
        this.currMonth = value;
      });
  }

  public btnPrev() {
    this.currMonth = this.localStorageSer.getData('selectedMY');
    this.shareableStreamStoreService.emit('btnPrev',
      this.dateServive.previousMonth(
        this.currMonth['year'].number, this.currMonth['month'].number, this.currMonth
      )
    );
  }

  public btnNext() {
    this.currMonth = this.localStorageSer.getData('selectedMY');
    this.shareableStreamStoreService.emit('btnNext',
      this.dateServive.nextMonth(
        this.currMonth['year'].number, this.currMonth['month'].number, this.currMonth
      )
    );
  }

  public onSelectedMonth() {
    /*
    * if ( weeks == true => month = true
    * if ( month == true => year  = true
    *
    * */
    const value = this.localStorageSer.getData('selectedMY');

    if (value['month'].active === true) {
      value['month'].active = false;
      value['year'].active = true;
    }
    if ( value['weeks'].active === true) {
      value['weeks'].active = false;
      value['month'].active = true;
    }

    this.localStorageSer.setData('selectedMY', value);
    this.shareableStreamStoreService.emit('selectM', value );

    this.showMonth = false;                       // Показать или скрыть месяц в шаблоне
  }

  ngOnDestroy() {
    this.subBtnPrev.unsubscribe();
    this.subBtnNext.unsubscribe();
    this.selectM.unsubscribe();
    this.selectY.unsubscribe();
  }

}
