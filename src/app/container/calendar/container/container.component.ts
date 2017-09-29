import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage-service.service";
import {ShareableStreamStoreService} from "../../services/shareable-stream-store.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector:    'app-container',
  templateUrl: './container.component.html',
  styleUrls:   ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {

  public valueState:    any;
  public subscription:  Subscription;
  public selectY:       Subscription;
  public selectM:       Subscription;
  constructor (
    private localStorageSer: LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {

  }

  ngOnInit() {
    // Значение компонентов  true or false по умолчанию weeks = true
    this.valueState = this.localStorageSer.getData('selectedMY');

    this.selectM = this.shareableStreamStoreService.getStream('selectM')
      .asObservable()
      .subscribe(value => this.valueState = value);

    this.selectY = this.shareableStreamStoreService.getStream('selectY')
      .asObservable()
      .subscribe(value => this.valueState = value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.selectY.unsubscribe();
    this.selectM.unsubscribe();
  }
}
