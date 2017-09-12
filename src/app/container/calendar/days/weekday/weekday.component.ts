import { Component,  ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DateService }                 from '../../../services/date.service';
import { ShareableStreamStoreService } from '../../../services/shareable-stream-store.service';
import { TodoService }                 from "../../../services/todo.service";


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit, OnDestroy {

  @Input() numWeek:     any;
  @Input() arrNotes:    any;

  public   items:       any;
  public   selectedDay: any;
  public   dayMonYear:  any;
  public   showNotes:   any;
  public subscription: Subscription;
  constructor(
    private dateServive: DateService,
    private todoService: TodoService,
    private elementRef: ElementRef,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {
  }

  ngOnInit() {
    this.dayMonYear = this.dateServive.showCurrMonth();
    this.items = this.dayMonYear[3][this.numWeek];
  }

  public selectDay(item: any) {
    // TODO: Переписать без jQuery
    $('#tabs').on('click', '._day', function(){
      $('#tabs ._day').removeClass('activeDate');
      $(this).addClass('activeDate');
    });

    // выбор даты
    this.shareableStreamStoreService.emit('SelectedDay', this.dateServive.selectedDay(item.day, item.passDay));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
