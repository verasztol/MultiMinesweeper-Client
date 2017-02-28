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
