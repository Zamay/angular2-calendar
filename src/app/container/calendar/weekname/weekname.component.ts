import { Component }  from '@angular/core';

import { DaysOfWeek } from '../../shared/cal.data';

@Component({
  selector:    'app-weekname',
  templateUrl: './weekname.component.html',
  styleUrls:   ['./weekname.component.css']
})
export class WeeknameComponent {

  public nameDaysOfWeek: Array<string> = DaysOfWeek;

}
