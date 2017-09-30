import { Component, OnInit } from '@angular/core';

import { DateService }                 from '../../services/date.service';
import { LocalStorageService }         from '../../services/local-storage-service.service';
import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';

@Component({
  selector:    'app-months',
  templateUrl: './months.component.html',
  styleUrls:   ['./months.component.css']
})
export class MonthsComponent implements OnInit {

  public months: any;
  constructor(
    private dateServive:      DateService,
    private localStorageSer:  LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.months = this.dateServive.getNameMonths();
  }

  public selectMonth(item: any) {
    const value = this.localStorageSer.getData('selectedMY');
    value['month'].number = item;                                // номер выбраного месяца
    value['month'].active = false;                               // скрываем текущи компонент
    value['days'].active = true;                                // делаем отображение компонента
    this.localStorageSer.setData('selectedMY', value);           // запишем в локалСтор
    this.shareableStreamStoreService.emit('selectM', value );    // сменить отображение другого компонента
    this.shareableStreamStoreService.emit('selectMonth' ,        // получим выбранный месяц и тоже для подписки
      this.dateServive.getDaysOfMonth(value['year'].number, value['month'].number));
  }

}
