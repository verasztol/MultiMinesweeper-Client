import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";
import {Game} from "../../models/game";
import {User} from "../../models/user";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private socket = null;
  nextPlayerName: string = null;
  game: Game = null;
  user: User = null;
  opponent: User = null;

  constructor(
    private socketService: SocketService,
    private userService: UserService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    me.user = me.userService.getUser();
    me.opponent = me.userService.getOpponent();
    me.game = me.userService.getGame();
    me.nextPlayerName = me.userService.getStarterPlayerName();

    if(me.user && me.opponent && me.game && me.nextPlayerName) {

      me.socket.on('game.shooted', function (data) {
        console.log("game.shooted", data);

        if(data && data.nextPlayerName) {
          me.changeNextPlayer(data.nextPlayerName);
        }
        else {
          // TODO
        }
      });
    }
    else {
      // TODO
    }
  }

  changeNextPlayer(name): void {
    this.nextPlayerName = name;
  }
}
