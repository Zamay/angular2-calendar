import { Component }  from '@angular/core';

import { DaysOfWeek } from '../../shared/cal.data';

@Component({
  selector: 'app-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.css']
})
export class WeekdaysComponent {

  public daysOfWeek: Array<string> = DaysOfWeek;

}
