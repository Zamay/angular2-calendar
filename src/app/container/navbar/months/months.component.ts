import {Component, OnDestroy, OnInit} from '@angular/core';

import { DateService }                  from '../../services/date.service';
import { ShareableStreamStoreService }  from '../../services/shareable-stream-store.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit, OnDestroy {
  public currMonth: Array<any>;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {

  }

  ngOnInit() {
    this.currMonth = this.dateServive.showCurrMonth() || ['Month' , 'day'];

    this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.currMonth = value);

    this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.currMonth = value);
  }

  ngOnDestroy() {

  }

}
