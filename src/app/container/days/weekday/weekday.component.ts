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
  public   day:         any;
  public   noteDay:         any;
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
    this.items = this.dateServive.showCurrMonth()[2][this.numWeek];

    this.subscription = this.shareableStreamStoreService.getStream('closeModal')
      .asObservable()
      .subscribe(value => this.showModal = value);

    this.subscription = this.shareableStreamStoreService.getStream('saveNote')
      .asObservable()
      .subscribe(value => {
        console.log(value[0]);
        this.showModal = value[1]; });

  }

  public getStyle(type: string) {
    return type;
  }

  public addNote(e: any) {
    this.day = e.target.innerText;

    let asd = localStorage.getItem(this.day+'/'+this.thisMonth[0]+'/'+this.thisMonth[1]);

    if (asd) {
      this.noteDay = asd;
    }

    this.showModal = true;
  }

  public closeModal(e: any) {
    this.showModal = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
