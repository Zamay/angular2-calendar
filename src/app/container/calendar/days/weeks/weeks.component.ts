import {Component, OnDestroy, OnInit} from '@angular/core';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css']
})
export class WeeksComponent implements OnInit, OnDestroy {

  public weeks: any;
  public subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.weeks = this.dateServive.showCurrMonth()[3];

    this.subscription = this.shareableStreamStoreService.getStream('btnPrev')
      .asObservable()
      .subscribe(value => this.weeks = value[2]);

    this.subscription = this.shareableStreamStoreService.getStream('btnNext')
      .asObservable()
      .subscribe(value => this.weeks = value[2]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
