import {Injectable} from '@angular/core';

import { MONTHS }   from '../shared/cal.data';

@Injectable()
export class DateService {
  public Months: Array<string> = MONTHS;
  public currMonth: number;
  public currYear: number;
  public currDay: number;

  constructor() {
    this.totalDate();
  }

  public totalDate() {
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
  }

  public nextMonth() {
    if (this.currMonth === 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    const arrDay = this.showDays(this.currYear, this.currMonth);
    return [this.Months[this.currMonth], this.currYear, arrDay];
  }

  public previousMonth() {
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    const arrDay = this.showDays(this.currYear, this.currMonth);
    return [this.Months[this.currMonth], this.currYear, arrDay];
  }

  public showCurrMonth() {
    const arrDay = this.showDays(this.currYear, this.currMonth);
    return [this.Months[this.currMonth], this.currYear, arrDay];
  }

  // получение даты

  public showDays(y, m) {

    const d = new Date(),
      firstDayOfMonth = new Date(y, m, 1).getDay(),
      lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
      lastDayOfLastMonth = m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    let arr = [];
    const arrs = [];
    let i = 1;
    do {
      let dow = new Date(y, m, i).getDay();

      if (dow === 0) {
        arr = [];
      } else if ( i === 1 ) {
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          arr.push(k + '');
          k++;
        }
      }

      let chk   = new Date();
      let chkY  = chk.getFullYear();
      let chkM  = chk.getMonth();
      if (chkY === this.currYear && chkM === this.currMonth && i === this.currDay) {
        arr.push(i);
      } else {
        arr.push(i);
      }

      if (dow === 6) {
        arrs.push(arr);
      } else if (i === lastDateOfMonth ) {
        let k = 1;
        for (dow; dow < 6; dow++) {
          arr.push(k + '');
          k++;
        }
        arrs.push(arr);
      }

      i++;
    } while (i <= lastDateOfMonth);

    return arrs;
  }
}
