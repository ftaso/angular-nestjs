import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { BaseConst} from '../class/url';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private url = BaseConst.BASE_SOCKETPOINT;
  private socket;

  connect(): void {
    this.socket = io(this.url);
  }

  emit(emitName: string, data?): void {
    this.socket.emit(emitName, data);
  }

  on(onName: string): any {
    const observable = new Observable(observer => {
      this.socket.on(onName, (data) => {
        observer.next(data);
      });

      return () => { this.socket.disconnect(); };
    });
    return observable;
  }
}
