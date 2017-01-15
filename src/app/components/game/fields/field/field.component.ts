import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../../../../services/socket.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";

@Component({
  selector: '[field]',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  private socket = null;
  private isMarked: string = null;
  private user: User = null;
  private opponent: User = null;

  value: (number | string) = null;

  @Input() x: number = null;
  @Input() y: number = null;

  constructor(
    private socketService: SocketService,
    private userService: UserService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    me.user = me.userService.getUser();
    me.opponent = me.userService.getOpponent();

    if(me.user && me.opponent) {

      let markedListener = (data) => {
        console.log("game.marked", data);

        if (data && data.marked) {
          let tmpMark = data.marked;
          if(tmpMark.x == me.x && tmpMark.y == me.y) {
            if(tmpMark.playerName === me.user.name) {
              me.isMarked = "../../../../../assets/blue.png";
            }
            else {
              me.isMarked = "../../../../../assets/red.png";
            }
            me.socket.removeListener("game.marked", markedListener);
          }
        }
        else {
          // TODO
        }
      };

      me.socket.on('game.marked', markedListener);

      let shootedListener = (data) => {
        console.log("game.shooted", data);

        if (data && data.shooted && Array.isArray(data.shooted)) {
          let tmpShoots = data.shooted;
          for(let i = 0; i < tmpShoots.length; i++) {
            let tmpShoot = tmpShoots[i];
            if(tmpShoot && tmpShoot.x == me.x && tmpShoot.y == me.y) {
              me.value = tmpShoot.value;
              me.isMarked = null;
              me.socket.removeListener("game.marked", markedListener);
              me.socket.removeListener("game.shooted", shootedListener);
              return;
            }
          }
        }
        else {
          // TODO
        }
      };

      me.socket.on('game.shooted', shootedListener);
    }
    else {
      // TODO
    }
  }

  onFieldRightClick(event): void {
    let me = this;
    event.preventDefault();
    me.socket.emit('game.mark', {mark: {x: me.x, y: me.y}});
  }

  onFieldLeftClick(): void {
    let me = this;
    me.socket.emit('game.shot', {shot: {x: me.x, y: me.y}});
  }
}
