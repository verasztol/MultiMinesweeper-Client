import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  private URL: string = environment.url;
  private socket: any = null;

  initSocket(): any {
    let me = this;
    me.socket = io.connect(me.URL);
    me.socket.__proto__.addSingleListener = (listenerName, listener) => {
      if(me.socket.hasListeners(listenerName)) {
        me.socket.removeListener(listenerName);
      }
      me.socket.on(listenerName, listener);
    };
  }

  getSocket(): any {
    if(!this.socket) {
      this.initSocket();
    }
    return this.socket;
  }
}
