import { Component, OnInit } from '@angular/core';

import { DateService }                 from '../../services/date.service';
import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css']
})
export class WeeksComponent implements OnInit {

  public weeks: any;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.weeks = this.dateServive.showCurrMonth()[2];

    this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.weeks = value[2]);

    this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.weeks = value[2]);
  }

}
