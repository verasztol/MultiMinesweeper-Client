import { Component } from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private socket = null;
  title: string = 'Welcome to multiplayer minesweeper';

  constructor(
    private userService: UserService,
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }



  login(userName): void {
    let me = this;
    if(userName && userName.trim()) {
      userName = userName.trim();
      console.log("login called", userName);
      me.socket.emit('authentication', {userName: userName});
    }
  }
}
