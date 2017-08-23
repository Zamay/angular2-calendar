import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DateService }                 from '../../services/date.service';
import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';
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
  public   showModal:   boolean = false;
  public subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {

    // localStorage.setItem('myCat', note);
    // localStorage.getItem('myCat');
  }

  ngOnInit() {
    this.thisMonth = this.dateServive.showCurrMonth();
    this.items = this.thisMonth[2][this.numWeek];

    this.subscription = this.shareableStreamStoreService.getStream('closeModal')
      .asObservable()
      .subscribe(value => this.showModal = value);
  }

  public getStyle(type: string) {
    return type;
  }

  public addNote(e: any) {
    this.selectedDay = e.target.innerText;

    let dmy = localStorage.getItem(this.selectedDay+'/'+this.thisMonth[0]+'/'+this.thisMonth[1]);
    console.log(this.selectedDay + '/' + this.thisMonth[0] + '/' + this.thisMonth[1]);
    console.log(dmy);
    if (dmy) {
      this.noteDay = dmy;
    } else {
      this.noteDay = false;
    }

    this.showModal = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
