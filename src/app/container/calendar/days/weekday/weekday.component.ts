import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';
@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit, OnDestroy {

  @Input() numWeek:     any;
  public   items:       any;
  public   selectedDay: any;
  public   noteDay:     any;
  public   thisMonth:   any;
  public   thisDay:     any;
  public   showModal:   boolean = false;
  public subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {
  }

  ngOnInit() {
    this.thisMonth = this.dateServive.showCurrMonth();
    this.items = this.thisMonth[3][this.numWeek];
  }

  public getStyle(type: any) {
    // TODO: Проверка на прошедший день и месяц
    return type;
  }

  public selectDay(item: any) {
    // Отображение в header даты + выбор даты
    this.shareableStreamStoreService.emit('SelectedDay', this.dateServive.selectedDay(item.day));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
