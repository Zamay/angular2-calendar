import { Component, Input, OnInit}     from '@angular/core';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';
import {isUndefined} from "util";


@Component({
  selector:    'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls:   ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {

  @Input() weekday:     any;
  public day: string | number;
  constructor(
  ) {
  }

  ngOnInit() {
    this.day = this.weekday.day || 0;
  }

  public selectDay(item: any) {
    // // текущено дню добавить класс activeDate
    // console.log(this.daysOfMonth);
    // for (const obj of this.daysOfMonth) {
    //   if (obj.active === true ) {
    //     obj.active = false;
    //   }
    //
    //   if ( item.day === obj.day) {
    //     obj.active = true;
    //   }
    // }

    // выбор даты
    // this.shareableStreamStoreService.emit('SelectedDay', this.dateServive.selectedDay(item.day, item.passDay) );
  }
}
