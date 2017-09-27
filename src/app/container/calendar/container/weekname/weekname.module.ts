import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { WeeknameComponent }  from './weekname.component';

@NgModule({
  imports:      [CommonModule],
  declarations: [WeeknameComponent],
  exports:      [WeeknameComponent],
})
export class WeeknameModule { }
