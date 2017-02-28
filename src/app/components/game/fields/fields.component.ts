import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {Game} from "../../../models/game";
import {Constants} from "../../../constants";

@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit, OnDestroy {

  private socket: any = null;
  private width: number = null;
  private height: number = null;
  private row: any = [];
  private col: any = [];
  private lastShoots: any = [];
  private lastMarked: any = null;
  private markedListener: Function = null;
  private shootedListener: Function = null;
  private endListener: Function = null;

  @Input() game: Game = null;

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    if(me.game) {
      me.width = me.game.width;
      me.height = me.game.height;
      me.row = Array(me.width).fill(1).map((x,i)=>i);
      me.col = Array(me.height).fill(1).map((x,i)=>i);
    }

    me.markedListener = (data) => {
      console.log("game marked", data);

      if (data && data.marked) {
        me.lastMarked = data.marked;
      }
      else {
        // TODO
      }
    };

    me.shootedListener = (data) => {
      console.log("fields components", "game shooted", data);

      if (data && data.shooted && Array.isArray(data.shooted)) {
        me.lastShoots = [];
        data.shooted.forEach((shoot) => {
          if(!me.lastShoots[shoot.x]) {
            me.lastShoots[shoot.x] = {};
          }
          me.lastShoots[shoot.x][shoot.y] = shoot;
        });
      }
      else {
        // TODO
      }
    };

    me.endListener = (data) => {
      console.log("game end", data);

      if (data && data.fields && Array.isArray(data.fields)) {
        me.lastShoots = [];
        data.fields.forEach((fieldRow, i) => {
          if(!me.lastShoots[i]) {
            me.lastShoots[i] = [];
          }
          fieldRow.forEach((fieldCol, j) => {
            if(!me.lastShoots[i][j]) {
              me.lastShoots[i][j] = {};
            }
            me.lastShoots[i][j].value = fieldCol;
            me.lastShoots[i][j].x = i;
            me.lastShoots[i][j].y = j;
          });
        });
      }
      else {
        // TODO
      }
    };

    me.socket.on(Constants.EVENTS.gameMarked, me.markedListener);
    me.socket.on(Constants.EVENTS.gameShooted, me.shootedListener);
    me.socket.on(Constants.EVENTS.gameEnd, me.endListener);
  }

  ngOnDestroy(): void {
    this.socketService.removeListener(Constants.EVENTS.gameMarked, this.markedListener);
    this.socketService.removeListener(Constants.EVENTS.gameShooted, this.shootedListener);
    this.socketService.removeListener(Constants.EVENTS.gameEnd, this.endListener);
  }
}
