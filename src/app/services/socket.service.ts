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
    me.socket.__proto__.addSingleListener = (listenerName: string, listener: any) => {
      if(me.socket.hasListeners(listenerName)) {
        me.socket.removeListener(listenerName);
        console.info("old listener was removed", listenerName);
      }
      me.socket.on(listenerName, listener);
    };
    me.socket.__proto__.addMultipleListener = (listenerName: string, newListener: any, listenerId: string) => {
      if(me.socket.hasListeners(listenerName)) {
        let callbacks = me.socket._callbacks;
        let listeners = callbacks[listenerName] || callbacks["$" + listenerName] || [];
        listeners.forEach((listener) => {
          if(listener.name === newListener.name && listener.id === listenerId) {
            me.socket.removeListener(listenerName, listener);
            console.info("old listener was removed", listenerName, listenerId);
          }
        });
      }
      newListener.id = listenerId;
      me.socket.on(listenerName, newListener);
    };
  }

  getSocket(): any {
    if(!this.socket) {
      this.initSocket();
    }
    return this.socket;
  }

  removeListener(key: string, listener: Function): void {
    if(key && listener && this.socket) {
      this.socket.removeListener(key, listener);
    }
  }
}
