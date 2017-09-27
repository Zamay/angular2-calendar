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
  constructor (
    private localStorageSer: LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) {

  }

  ngOnInit() {
    // Значение компонентов  true or false
    this.valueState = this.localStorageSer.getData('selectedMY');
    // Подписаться на изменение знаачения
    this.subscription = this.shareableStreamStoreService.getStream('SelectedMY')
      .asObservable()
      .subscribe(value => this.valueState = value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
