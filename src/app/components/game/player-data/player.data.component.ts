import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {Game} from "../../../models/game";
import {SocketService} from "../../../services/socket.service";

@Component({
  selector: 'player-data',
  templateUrl: './player.data.component.html',
  styleUrls: ['./player.data.component.css']
})
export class PlayerDataComponent implements OnInit {
  private socket = null;

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

    me.socket.on('game.marked', (data) => {
      if (data && data.marked && data.marked.playerName === me.name) {
        me.marker = data.markerCount || 0;
      }
      else {
        // TODO
      }
    });
  }
}
