import { Component,
         OnDestroy,
         OnInit }       from '@angular/core';
import { Observable }   from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { ShareableStreamStoreService }  from '../services/shareable-stream-store.service';
import { DateService }                  from '../services/date.service';
@Component({
  selector:    'app-header',
  templateUrl: './header.component.html',
  styleUrls:   ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public clock: any;
  public date:  any;
  public subscription:  Subscription;
  constructor(
    private shareableStreamStoreService: ShareableStreamStoreService,
    private dateServive: DateService
  ) {
    this.clock = Observable.interval(1000).map(() => new Date());
    this.date = this.dateServive.currSelecDay();
  }
  ngOnInit() {
    this.subscription = this.shareableStreamStoreService.getStream('SelectedDay')
      .asObservable()
      .subscribe(value => this.date = value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
