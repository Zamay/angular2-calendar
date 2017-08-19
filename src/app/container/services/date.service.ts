import {Injectable} from '@angular/core';

import {MONTHS} from '../shared/cal.data';

@Injectable()
export class DateService {
  public Months: Array<string> = MONTHS;
  public currMonth: number;
  public currYear: number;
  public currDay: number;
  public firstDayOfMonth: number;
  public lastDateOfMonth: number;
  public lastDayOfLastMonth: number;

  constructor() {
    this.totalDate();
  }

  public totalDate() {
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

    this.firstDayOfMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    this.lastDateOfMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    this.lastDayOfLastMonth = this.currMonth === 0 ? new Date(this.currYear - 1, 11, 0).getDate() :
      new Date(this.currYear, this.currMonth, 0).getDate();
  }

  public nextMonth() {
    if (this.currMonth === 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    this.showMonth(this.currYear, this.currMonth)
    return [this.Months[this.currMonth], this.currYear];
  }

  public previousMonth() {
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    return [this.Months[this.currMonth], this.currYear];
  }

  public showCurrMonth() {
    return [this.Months[this.currMonth], this.currYear];
  }

  // получение даты

  public showMonth(y, m) {

    const d = new Date(),
      firstDayOfMonth = new Date(y, m, 1).getDay(),
      lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
      lastDayOfLastMonth = m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    let i = 1;
    do {
      let dow = new Date(y, m, i).getDay(),
          qwe;
      qwe = i - 1;
      if (dow === 0) {
        for (let j = 0; j < 6; j++) {
          qwe += 1;
          console.log(qwe);
        }
        i = qwe;
      }


      // if (dow === 0) {
      //   console.log(0);
      // }
      //
      // // else if ( i === 1 ) {
      // //
      // //   let k = lastDayOfLastMonth - firstDayOfMonth+1;
      // //   for(let j=0; j < firstDayOfMonth; j++) {
      // //     k
      // //     k++;
      // //   }
      // // }
      //
      //
      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      if (chkY === this.currYear && chkM === this.currMonth && i === this.currDay) {
        console.log('today');
      } else {
        console.log('other');
      }
      //
      // if (dow === 6) {
      //   console.log(6);
      // }
      //
      // // else if (i === lastDateOfMonth ) {
      // //   let k=1;
      // //   for(dow; dow < 6; dow++) {
      // //     k
      // //     k++;
      // //   }
      // // }
      console.log(i);
      i++;
    } while (i <= lastDateOfMonth);


  }
}
