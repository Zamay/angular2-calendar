import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public setLocalStorage(key, note) {
    localStorage.setItem(key[2] + '/' + key[1] + '/' + key[3], note);
    return this.getLocalStorage(key);
  }

  public getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key[2] + '/' + key[1] + '/' + key[3]));
  }

  public setData(key, data) {
    localStorage.setItem(key , JSON.stringify(data));
  }

  public getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
