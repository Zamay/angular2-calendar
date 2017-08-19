import { Component, OnInit } from '@angular/core';

import { DateService }                  from '../../services/date.service';
import { ShareableStreamStoreService }  from '../../services/shareable-stream-store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private shareableStreamStoreService: ShareableStreamStoreService,
    private dateServive: DateService
    ) { }

  ngOnInit() {
  }

  public btnPrev() {
    this.shareableStreamStoreService.emit('btnPrev' , this.dateServive.nextMonth());
  }

  public btnNext() {
    this.shareableStreamStoreService.emit('btnNext' , this.dateServive.previousMonth());
  }

}
