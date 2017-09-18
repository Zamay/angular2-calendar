import { Component, Input, OnInit}     from '@angular/core';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';


@Component({
  selector:    'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls:   ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {

  @Input() numWeek:     any;
  @Input() arrNotes:    any;
  @Input() daysOfMonth: any;

  public   months:      any;
  public   items:       any;
  public   selectedDay: any;
  public   dayMonYear:  any;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {
  }

  ngOnInit() {
    this.dayMonYear = this.dateServive.showCurrMonth();
    this.items = this.dayMonYear[3][this.numWeek];

    this.months = this.dateServive.getMonth();
    console.log(this.months);
  }

  public selectDay(item: any) {
    // текущено дню добавить класс activeDate
    for (const obj of this.daysOfMonth) {
      if (obj.active) {
        obj.active = false;
      }

      if ( item.day === obj.day) {
        obj.active = true;
      }
    }

    // выбор даты
    this.shareableStreamStoreService.emit('SelectedDay', this.dateServive.selectedDay(item.day, item.passDay) );
  }
}
