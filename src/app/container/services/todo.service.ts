import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  public setNotesDay(key, note) {
    localStorage.setItem(key[2] + '/' + key[1] + '/' + key[3], note);
    return this.getNotesDay(key);
  }

  public getNotesDay(key) {
    return JSON.parse(localStorage.getItem(key[2] + '/' + key[1] + '/' + key[3]));
  }

}
