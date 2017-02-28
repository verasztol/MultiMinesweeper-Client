import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../../models/user";
import {Game} from "../../../models/game";
import {SocketService} from "../../../services/socket.service";
import {Constants} from "../../../constants";

@Component({
  selector: 'player-data',
  templateUrl: './player.data.component.html',
  styleUrls: ['./player.data.component.css']
})
export class PlayerDataComponent implements OnInit, OnDestroy {
  private socket:any = null;
  private gameMarkedListener: Function = null;

  name: string = null;
  maxMarker: number = null;
  marker: number = 0;

  @Input() player: User = null;
  @Input() game: Game = null;
  @Input() isOpponent: boolean = false;
  @Input() score: number = 0;

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;
    this.name = (me.player) ? me.player.name : "";

    me.maxMarker = (me.game) ? me.game.maxMarker : null;

    me.gameMarkedListener = (data) => {
      if (data && data.marked && data.marked.playerName === me.name) {
        me.marker = data.markerCount || 0;
      }
      else {
        // TODO
      }
    };

    me.socket.on(Constants.EVENTS.gameMarked, me.gameMarkedListener);
  }

  ngOnDestroy(): void {
    this.socketService.removeListener(Constants.EVENTS.gameMarked, this.gameMarkedListener);
  }
}
