import {Component, Input, OnInit} from '@angular/core';
import { DateService }       from '../../services/date.service';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {

  @Input() numWeek: any;
  public weekDay: any;
  constructor(private dateServive: DateService) { }

  ngOnInit() {
    this.weekDay = this.dateServive.showCurrMonth()[2][this.numWeek];
  }

  // *ngIf="show; then thenBlock; else elseBlock"
  // [ngClass]="{'first': true, 'second': true, 'third': false}"
}
