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
  text = "There is no available player!";

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;
    me.socket.on('user.listed', function(data) {
      console.log("listed", data);
      me.notPlayingUsers = data;
      me.fixText(data);
    });

    me.socket.on("global.user.added", function(data) {
      console.log("global.user.added", data);
      if(data && data.userName) {
        me.notPlayingUsers.push(data.userName);
        me.fixText(me.notPlayingUsers);
      }
    });

    me.socket.on("global.user.left", function(data) {
      console.log("global.user.left", data);
      if(data && data.userName) {
        me.notPlayingUsers = me.notPlayingUsers.filter((item) => {
          return item !== data.userName;
        });
        me.fixText(me.notPlayingUsers);
      }
    });

    me.refresh();
  }

  fixText(data) {
    if(data && data.length) {
      this.text = "List of available player(s). Choose your opponent!";
    }
    else {
      this.text = "There is no available player!";
    }
  }

  refresh(): void {
    this.socket.emit('user.list');
  }
}
