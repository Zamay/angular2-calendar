import {Component, OnInit, OnDestroy, Input} from '@angular/core';

import { ShareableStreamStoreService } from '../../services/shareable-stream-store.service';
import { DateService } from "../../services/date.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public   thisMonth:     any;
  @Input() public getday: any;
  @Input() public getNote: any;
  public   subscription:  Subscription;
  constructor(
    private dateServive: DateService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.thisMonth = this.dateServive.showCurrMonth();
  }

  public closeMod(e: any) {
    this.shareableStreamStoreService.emit('closeModal' , false);
  }

  public saveNote(note: any) {
    console.log(note.value);
    localStorage.setItem(this.getday + '/' + this.thisMonth[0] + '/' + this.thisMonth[1], note);
    this.shareableStreamStoreService.emit('saveNote' , [note, false]);
  }
}
