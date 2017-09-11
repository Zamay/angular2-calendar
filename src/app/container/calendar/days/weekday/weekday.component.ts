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
  @ViewChild('selDay')  selDay;
  public   items:       any;
  public   selectedDay: any;
  public   dayMonYear:  any;
  public   showNotes:   any;
  public selectedIndex: any;
  selectedWeekIndex: any
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

    for (let i of this.items) {
      this.showNotes = this.todoService.getNotesDay(['', this.dayMonYear[1], i.day, i.year]);

    }
  }

  public getStyle(type: any) {
    // TODO: Проверка на прошедший день и месяц
    return type;
  }



  public selectDay(item: any, i: number) {

    this.selectedIndex = 7 * (this.numWeek + 1) + (i + 1);

    console.log($('#tabs'));

    $('#tabs').on('click', '._day', function(){
      $('#tabs ._day').removeClass('activeDate');
      $(this).addClass('activeDate');
    });


    // выбор даты
    this.shareableStreamStoreService.emit('SelectedDay', this.dateServive.selectedDay(item.day));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
