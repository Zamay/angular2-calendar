import {Injectable, Input} from '@angular/core';
import {Subject}           from "rxjs/Subject";

@Injectable()
export class ShareableStreamStoreService {
  public streams: Object = {};

  getStream (key: string) {
    if ( this.streams[key] === null || this.streams[key] === undefined ) {
      this.streams[key] = new Subject();
    }

    return this.streams[key];
  }

  emit(key: string, value: any) {
    this.getStream(key).next(value);
  }
}
