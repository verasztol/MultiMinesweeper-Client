import {Component, OnInit, OnDestroy} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {Constants} from "../../../constants";

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {

  private socket: any = null;
  private notPlayingUsers: any = [];
  private userListedListener: Function = null;
  private globalUserAddedListener: Function = null;
  private userLeftListener: Function = null;

  text = "There is no available player!";

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    console.log("PlayersComponent init");
    let me = this;

    if(me.socket) {

      me.userListedListener = (data) => {
        console.log("listed", data);
        me.notPlayingUsers = data;
        me.fixText(data);
      };

      me.globalUserAddedListener = (data) => {
        console.log("global user added", data);
        if (data && data.userName) {
          me.notPlayingUsers.push(data.userName);
          me.fixText(me.notPlayingUsers);
        }
      };

      me.userLeftListener = (data) => {
        console.log("global user left", data);
        if (data && data.userName) {
          me.notPlayingUsers = me.notPlayingUsers.filter((item) => {
            return item !== data.userName;
          });
          me.fixText(me.notPlayingUsers);
        }
      };

      me.socket.addSingleListener(Constants.EVENTS.userListed, me.userListedListener);
      me.socket.addSingleListener(Constants.EVENTS.globalUserAdded, me.globalUserAddedListener);
      me.socket.addSingleListener(Constants.EVENTS.globalUserLeft, me.userLeftListener);

      me.refresh();
    }
  }

  ngOnDestroy(): void {
    this.socketService.removeListener(Constants.EVENTS.userListed, this.userListedListener);
    this.socketService.removeListener(Constants.EVENTS.globalUserAdded, this.globalUserAddedListener);
    this.socketService.removeListener(Constants.EVENTS.globalUserLeft, this.userLeftListener);
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
