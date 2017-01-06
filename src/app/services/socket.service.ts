import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private URL: string = "https://multi-minesweeper.herokuapp.com/";//"http://localhost:3000";
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
