import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {Constants} from "../../../constants";

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
    console.log("PlayersComponent init");
    let me = this;

    if(me.socket) {

      let userListedListener = (data) => {
        console.log("listed", data);
        me.notPlayingUsers = data;
        me.fixText(data);
      };

      let globalUserAddedListener = (data) => {
        console.log("global user added", data);
        if (data && data.userName) {
          me.notPlayingUsers.push(data.userName);
          me.fixText(me.notPlayingUsers);
        }
      };

      let userLeft = (data) => {
        console.log("global user left", data);
        if (data && data.userName) {
          me.notPlayingUsers = me.notPlayingUsers.filter((item) => {
            return item !== data.userName;
          });
          me.fixText(me.notPlayingUsers);
        }
      };

      me.socket.addSingleListener(Constants.EVENTS.userListed, userListedListener);
      me.socket.addSingleListener(Constants.EVENTS.globalUserAdded, globalUserAddedListener);
      me.socket.addSingleListener(Constants.EVENTS.globalUserLeft, userLeft);

      me.refresh();
    }
  }

  fixText(data): void {
    if(data && data.length) {
      this.text = "List of available player(s). Choose your opponent!";
    }
    else {
      this.text = "There is no available player!";
    }
  }

  refresh(): void {
    this.socket.emit(Constants.EVENTS.userList);
  }
}
