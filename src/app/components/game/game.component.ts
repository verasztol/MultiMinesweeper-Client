import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";
import {Game} from "../../models/game";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {Constants} from "../../constants";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private socket = null;
  private timer = null;
  private isPlayerChange: boolean = false;
  nextPlayerName: string = null;
  game: Game = null;
  user: User = null;
  opponent: User = null;
  mineCount: number = null;
  userScore: number = 0;
  opponentScore: number = 0;
  isEnded: boolean = false;

  constructor(
    private router: Router,
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

      me.mineCount = me.game.mineCount || 0;

      let gameShootedListener = (data) => {
        console.log("game components", "game shooted", data);

        if(data && data.nextPlayerName) {
          if(data.nextPlayerName !== me.user.name) {
            me.userScore = data.score;
          }
          else {
            me.opponentScore = data.score;
          }
          me.changeNextPlayer(data.nextPlayerName);
        }
        else {
          // TODO
        }
      };

      let gameEndListener = (data) => {
        me.isEnded = true;
      };

      me.socket.addMultipleListener(Constants.EVENTS.gameShooted, gameShootedListener, "gameShootedListenerFromGame");
      me.socket.addMultipleListener(Constants.EVENTS.gameEnd, gameEndListener, "gameEndListenerFromGame");
    }
    else {
      // TODO
    }
  }

  canDeactivate(): Promise<boolean> | boolean {
    console.log("canDeactivate", !this.userService.getOpponent());
    return !this.userService.getOpponent();
  }

  changeNextPlayer(name): void {
    let me  = this;
    me.nextPlayerName = name;
    me.isPlayerChange = true;

    if(me.timer) {
      clearTimeout(this.timer);
    }
    me.timer = setTimeout(() => {
      me.isPlayerChange = false;
    }, 1000);
  }

  goToPlayers(): void {
    this.router.navigate([Constants.PAGES.dashboard]);
  }
}
