import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  private URL: string = environment.url;
  private socket: any = null;

  initSocket(): any {
    this.socket = io.connect(this.URL);
  }

  getSocket(): any {
    if(!this.socket) {
      this.initSocket();
    }
    return this.socket;
  }
}
