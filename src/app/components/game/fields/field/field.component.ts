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
  private isMarkedByMe: boolean = false;
  private isShootedByMe: boolean = false;
  private user: User = null;
  private opponent: User = null;

  value: number = null;

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
      me.socket.on('game.marked', function (data) {
        console.log("game.marked", data);

        if (data && data.marked && Array.isArray(data.marked)) {
          let last = data.marked.length - 1;
          let tmpMark = data.marked[last];
          if(tmpMark && tmpMark.x == me.x && tmpMark.y == me.y) {
            if(tmpMark.playerName === me.user.name) {
              me.isMarkedByMe = true;
            }
            me.value = -2;
          }
        }
        else {
          // TODO
        }
      });

      me.socket.on('game.shooted', function (data) {
        console.log("game.shooted", data);

        if (data && data.shooted) {
          let last = data.shooted.length - 1;
          let tmpShoots = data.shooted[last];
          if(tmpShoots && Array.isArray(tmpShoots)) {
            for(let i = 0; i < tmpShoots.length; i++) {
              let tmpShoot = tmpShoots[i];
              if(tmpShoot && tmpShoot.x == me.x && tmpShoot.y == me.y) {
                if(tmpShoot.playerName === me.user.name) {
                  me.isShootedByMe = true;
                }
                me.value = tmpShoot.value;
              }
            }
          }
          else {
            // TODO
          }
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
