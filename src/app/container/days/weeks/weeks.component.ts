import { Component, OnInit } from '@angular/core';
import { DateService }       from '../../services/date.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css']
})
export class WeeksComponent implements OnInit {

  public lastDay: number
  constructor(private dateServive: DateService) {
    this.lastDay = this.dateServive.lastDateOfMonth;
  }

  ngOnInit() {
  }


}
