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
    const className = e.target.className;

    if (className === 'today' || className === 'carrent') {
      let dmy = localStorage.getItem(this.selectedDay+'/'+this.thisMonth[0]+'/'+this.thisMonth[1]);
      if (dmy) {
        this.noteDay = dmy;
      } else {
        this.noteDay = false;
      }

      this.showModal = true;
    }
    if ( className === 'tomorrow') {
      this.shareableStreamStoreService.emit('btnNext' , this.dateServive.nextMonth());
    }
    if (className === 'yesterday') {
      this.shareableStreamStoreService.emit('btnPrev' , this.dateServive.previousMonth());
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
