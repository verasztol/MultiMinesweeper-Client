import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../../services/socket.service";

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private socket = null;
  private notPlayingUsers = [];

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;
    me.socket.on('user.listed', function(data) {
      console.log("listed", data);
      me.notPlayingUsers = data;
    });

    me.refresh();
  }

  refresh(): void {
    this.socket.emit('user.list');
  }
}
