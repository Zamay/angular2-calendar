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
    this.valueData();

    this.subBtnPrev = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.valueData());

    this.subBtnNext = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.valueData());

    this.selectM = this.shareableStreamStoreService.getStream('selectM')
      .asObservable()
      .subscribe(value => {
        this.showMonth = true;
        this.valueData(value);
      });

    this.selectY = this.shareableStreamStoreService.getStream('selectY')
      .asObservable()
      .subscribe(value => {
        this.showMonth = false;
        this.valueData(value);
      });
  }
  // Убираем повторяющийся код
  private valueData(value?: any) {
    this.currMonth = value || this.localStorageSer.getData('selectedMY');
    this.currMonth['month'].number =  this.Months[this.currMonth['month'].number];
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
    * if ( days == true => month = true
    * if ( month == true => year  = true
    *
    * */
    const value = this.localStorageSer.getData('selectedMY');

    if (value['month'].active === true) {
      value['month'].active = false;
      value['year'].active = true;
    }
    if ( value['days'].active === true) {
      value['days'].active = false;
      value['month'].active = true;
    }

    this.localStorageSer.setData('selectedMY', value);
    this.shareableStreamStoreService.emit('selectM', value );

    // Показать или скрыть месяц в шаблоне
    this.showMonth = false;
  }

  // TODO:может как-то сократить ?!
  ngOnDestroy() {
    this.subBtnPrev.unsubscribe();
    this.subBtnNext.unsubscribe();
    this.selectM.unsubscribe();
    this.selectY.unsubscribe();
  }

}
