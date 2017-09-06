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
    // this.subscription = this.shareableStreamStoreService.getStream('closeModal')
    //   .asObservable()
    //   .subscribe(value => this.showModal = value);
  }

  public getStyle(type: any) {
    // TODO: Проверка на прошедший день и месяц

    if (type === 'current') {
      return 'activeDate';
    }
    return type;
  }

  public addNote(e: any) {
    this.selectedDay = e.target.innerText;
    const className  = e.target.className;

    // Отображение в header даты
    this.shareableStreamStoreService.emit('SelectedDay', this.dateServive.selectedDay(this.selectedDay))


    // проверка дней этого месяца
    if (className === 'today' || className === 'current') {
      let dmy = localStorage.getItem(this.selectedDay+'/'+this.thisMonth[0]+'/'+this.thisMonth[1]);
      (dmy) ? this.noteDay = dmy : this.noteDay = false ;

      // this.showModal = true;
    }

    // переход на пред и след мусяци при надатии на дату
    if ( className === 'tomorrow') {
      this.shareableStreamStoreService.emit('btnNext' , this.dateServive.nextMonth());
    }
    if (className === 'yesterday') {
      this.shareableStreamStoreService.emit('btnPrev' , this.dateServive.previousMonth());
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
