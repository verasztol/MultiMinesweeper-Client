import { Component } from '@angular/core';
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private socket = null;
  title: string = 'Welcome to multiplayer minesweeper';

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  login(userName): void {
    let me = this;
    console.log("login called", userName);
    me.socket.emit('authentication', {userName: userName});
  }
}
