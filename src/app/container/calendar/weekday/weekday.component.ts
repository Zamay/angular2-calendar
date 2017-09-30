import { Component, Input, OnInit}  from '@angular/core';

import { LocalStorageService }      from '../../services/local-storage-service.service';
import {ShareableStreamStoreService} from "../../services/shareable-stream-store.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector:    'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls:   ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {

  @Input() weekday:     any;
  public day: string | number;
  constructor(
    private localStorageSer:  LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {
  }

  ngOnInit() {
    this.day = this.weekday.day || 0;
  }

  public selectDay(number: any) {
    // TODO: Переписать без jQuery
    $('._weekday').on('click', '._day', function () {
      $('._weekday ._day').removeClass('activeDate');
      $(this).addClass('activeDate');
    });

    let valueData = this.localStorageSer.getData('selectedMY');
    valueData['days'].number = number.target.innerText;
    this.localStorageSer.setData('selectedMY', valueData);
    this.shareableStreamStoreService.emit('selectMY ', valueData);
  }
}
