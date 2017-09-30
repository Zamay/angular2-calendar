import { Component, Input} from '@angular/core';

@Component({
  selector:    'app-week',
  templateUrl: './week.component.html',
  styleUrls:   ['./week.component.css']
})
export class WeeksComponent {

  @Input() week: any;

}
