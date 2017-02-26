import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";
import {Game} from "../../models/game";
import {User} from "../../models/user";
import {Router} from "@angular/router";

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

      me.socket.on('game.shooted', (data) => {
        console.log("game.components", "game.shooted", data);

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
      });

      me.socket.on("game.end", (data) => {
        me.isEnded = true;
      });
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
    this.nextPlayerName = name;
  }

  goToPlayers(): void {
    this.router.navigate(['/dashboard']);
  }
}
