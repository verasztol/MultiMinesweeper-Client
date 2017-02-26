import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../../../services/socket.service";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

  private socket = null;
  waiting: boolean = false;

  @Input() name:string = "";

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    let userDeclinedListener = (data) => {
      console.log("user.declinedPlay", data);
      if(data && data.enemyName === me.name) {
        me.waiting = false;
      }
    };

    me.socket.addSingleListener('user.declinedPlay', userDeclinedListener);
  }

  select(): void {
    this.waiting = true;
    this.socket.emit('user.select', {userName: this.name});
  }
}
