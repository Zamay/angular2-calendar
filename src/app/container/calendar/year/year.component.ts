import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { DateService }                  from '../../services/date.service';
import { LocalStorageService }          from '../../services/local-storage-service.service';
import { ShareableStreamStoreService }  from '../../services/shareable-stream-store.service';

@Component({
  selector:    'app-year',
  templateUrl: './year.component.html',
  styleUrls:   ['./year.component.css']
})
export class YearComponent implements OnInit, OnDestroy {

  public years:        Array<number>;
  public subBtnPrevY:  Subscription;
  public subBtnNextY:  Subscription;
  constructor(
    private dateServive:      DateService,
    private localStorageSer:  LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.years = this.dateServive.getYears();

    this.subBtnPrevY = this.shareableStreamStoreService.getStream('bntRevY')
      .asObservable()
      .subscribe(value => this.years = value);

    this.subBtnNextY = this.shareableStreamStoreService.getStream('bntNextY')
      .asObservable()
      .subscribe(value => this.years = value);
  }

  public selectYear(item: any) {
    const value = this.localStorageSer.getData('selectedMY');
    value['year'].number = item;                                // номер выбраного месяца
    value['year'].active = false;                               // скрываем текущи компонент
    value['month'].active = true;                               // делаем отображение компонента
    this.localStorageSer.setData('selectedMY', value);          // запишем в локалСтор
    this.shareableStreamStoreService.emit('selectY', value);    // сменить отображение navbar компонента
  }

  ngOnDestroy() {
    this.subBtnPrevY.unsubscribe();
    this.subBtnNextY.unsubscribe();
  }
}
