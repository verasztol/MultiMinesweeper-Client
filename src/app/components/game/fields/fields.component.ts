import {Component, OnInit, Input} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {Game} from "../../../models/game";
import {Constants} from "../../../constants";

@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  private socket = null;
  private width: number = null;
  private height: number = null;
  private row: any = [];
  private col: any = [];
  private lastShoots: any = [];
  private lastMarked: any = null;

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

    let markedListener = (data) => {
      console.log("game marked", data);

      if (data && data.marked) {
        me.lastMarked = data.marked;
      }
      else {
        // TODO
      }
    };

    let shootedListener = (data) => {
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

    let endListener = (data) => {
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

    me.socket.addMultipleListener(Constants.EVENTS.gameMarked, markedListener, "gameMarkedListenerFromFields");
    me.socket.addMultipleListener(Constants.EVENTS.gameShooted, shootedListener, "gameShootedListenerFromFields");
    me.socket.addMultipleListener(Constants.EVENTS.gameEnd, endListener, "gameEndListenerFromFields");
  }
}
