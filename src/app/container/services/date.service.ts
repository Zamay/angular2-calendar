import {Injectable}   from '@angular/core';

import {DAYS, MONTHS} from '../shared/cal.data';

@Injectable()
export class DateService {
  public Months: Array<string> = MONTHS;
  public Days: Array<any> = DAYS;
  public currMonth: number;
  public currYear: number;
  public currDay: number;
  public passDays: boolean = true;

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
    const obj_arrDay = this.obj_showDays(this.currYear, this.currMonth);
    return [this.Months[this.currMonth], this.currYear, obj_arrDay];
  }

  public previousMonth() {
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    const obj_arrDay = this.obj_showDays(this.currYear, this.currMonth);
    return [this.Months[this.currMonth], this.currYear, obj_arrDay];
  }

  public showCurrMonth() {
    this.passDays = true;
    const obj_arrDay = this.obj_showDays(this.currYear, this.currMonth);
    return [this.currDay, this.Months[this.currMonth], this.currYear, obj_arrDay];
  }

  public currSelecDay() {
    return this.selectedDay(this.currDay, '');
  }

  public selectedDay(day: number, item: any) {
    const weekDay = this.Days[new Date(this.currYear, this.currMonth, day).getUTCDay()].long;
    return [weekDay, this.Months[this.currMonth], day, this.currYear, item];
  }

  // получение даты
  public obj_showDays(y, m) {
    const d = new Date(),
      firstDayOfMonth = new Date(y, m, 1).getDay(),
      lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
      lastDayOfLastMonth = m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    const arrs = [];
    let arr = [];
    let obj = {};

    let i = 1;
    do {
      let dow = new Date(y, m, i).getDay();

      if (dow === 0) {
        arr = [];
      } else if (i === 1) {
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          // obj = {
          //   day: k,
          //   type: 'yesterday'
          // };
          // arr.push(obj);
          arr.push('');
          k++;
        }
      }
// debugger
//       console.log('1')
      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      // ГОВНОКОД !!!
      if (chkY === this.currYear && chkM === this.currMonth && i === this.currDay) {
        this.passDays = false;
        obj = {
          day: i,
          month: this.currMonth,
          year: this.currYear,
          type: 'current',
          passDay: false
        };
        arr.push(obj);
      } else if (chkY === this.currYear && chkM === this.currMonth) {
        if (i < this.currDay) {
          obj = {
            day: i,
            month: this.currMonth,
            year: this.currYear,
            type: 'today',
            passDay: true
          };
          arr.push(obj);
        } else {
          obj = {
            day: i,
            month: this.currMonth,
            year: this.currYear,
            type: 'today',
            passDay: false
          };
          arr.push(obj);
        }
      } else {
        if (chkM >= this.currMonth) {
          obj = {
            day: i,
            month: this.currMonth,
            year: this.currYear,
            type: 'today',
            passDay: true
          };
          arr.push(obj);
        } else {
          obj = {
            day: i,
            month: this.currMonth,
            year: this.currYear,
            type: 'today',
            passDay: false
          };
          arr.push(obj);
        }
      }


      if (dow === 6) {
        arrs.push(arr);
      } else if (i === lastDateOfMonth) {
        let k = 1;
        for (dow; dow < 6; dow++) {
          // obj = {
          //   day: k,
          //   type: 'tomorrow'
          // };
          // arr.push(obj);
          arr.push('');
          k++;
        }
        arrs.push(arr);
      }
      i++;
    } while (i <= lastDateOfMonth);
    return arrs;
  }

}
