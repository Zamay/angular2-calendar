import {
  Component, Input,
  OnDestroy,
  OnInit
}             from '@angular/core';

@Component({
  selector:    'app-week',
  templateUrl: './week.component.html',
  styleUrls:   ['./week.component.css']
})
export class WeeksComponent implements OnInit, OnDestroy {

  @Input() week:         any;
  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
