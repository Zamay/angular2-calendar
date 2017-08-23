import {Component, OnInit, OnDestroy, Input} from '@angular/core';

import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';
import { DateService } from "../../services/date.service";
import { Subscription } from "rxjs/Subscription";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public   thisMonth:      any;
  @Input() selectedDay:    any;
  @Input() getNote:        any;
  public   subscription:   Subscription;
  public   formDate:       FormGroup;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.formDate = new FormGroup({
      'note': new FormControl(this.getNote || '')
    });
    this.thisMonth = this.dateServive.showCurrMonth();
  }

  public closeMod() {
    this.shareableStreamStoreService.emit('closeModal' , false);
  }

  public saveNote() {
    console.log(this.formDate.value.note);
    localStorage.setItem(this.selectedDay + '/' + this.thisMonth[0] + '/' + this.thisMonth[1], this.formDate.value.note);

    this.closeMod();
  }
}
