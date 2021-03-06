import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {SocketService} from "../../../../services/socket.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {Constants} from "../../../../constants";

@Component({
  selector: '[field]',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit, OnChanges {

  private socket = null;
  private isMarked: string = null;
  private isMarkedByMe: boolean = false;
  private user: User = null;
  private opponent: User = null;
  private timer = null;
  private isLongClick: boolean = false;
  private hasAction: boolean = false;
  private wrongMark: string = "";

  value: (number | string) = null;

  @Input() x: number = null;
  @Input() y: number = null;
  @Input() lastMarked: any = null;
  @Input() shoot: any = null;

  constructor(
    private socketService: SocketService,
    private userService: UserService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    me.user = me.userService.getUser();
    me.opponent = me.userService.getOpponent();
  }

  handleMark(data) {
    let me = this;
    // console.log("handleMark", data, "x: " + me.x, "y: " + me.y);
    if (data && data.x == me.x && data.y == me.y) {
      if(data.type === "unmark") {
        me.isMarkedByMe = false;
        me.isMarked = null;
      }
      else {
        if (data.playerName === me.user.name) {
          me.isMarkedByMe = true;
          me.isMarked = "../../../../../assets/blue.png";
        }
        else {
          me.isMarked = "../../../../../assets/red.png";
        }
      }
      me.hasAction = true;
    }
    else {
      // TODO
      me.hasAction = false;
    }
  }

  handleShoot(data) {
    let me = this;
    // console.log("handleShoot", data, "x: " + me.x, "y: " + me.y);
    if(data && data.x == me.x && data.y == me.y) {
      if(data.value >= 0) {
        me.value = data.value;
        if(me.isMarked) {
          if(me.isMarkedByMe) {
            me.wrongMark = "wrong-mark-me";
          }
          else {
            me.wrongMark = "wrong-mark-opponent";
          }
        }
        me.isMarked = null;
      }
      else {
        if(me.isMarked) {
          if (me.isMarkedByMe) {
            me.isMarked = "../../../../../assets/ok_blue.png";
          }
          else {
            me.isMarked = "../../../../../assets/ok_red.png";
          }
        }
        else {
          me.isMarked = "../../../../../assets/logo_orig.png";
        }
      }
      me.hasAction = true;
    }
    else {
      me.hasAction = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes", changes);
    if(changes["lastMarked"]) {
      this.handleMark(changes["lastMarked"].currentValue);
    }
    if(changes["shoot"]) {
      this.handleShoot(changes["shoot"].currentValue);
    }
  }

  onFieldRightClick(event): void {
    let me = this;
    event.preventDefault();
    if(this.timer) {
      clearTimeout(this.timer);
    }
    if(!this.isLongClick && me.userService.getOpponent()) {
      me.socket.emit(Constants.EVENTS.gameMark, {mark: {x: me.x, y: me.y}});
    }
    this.isLongClick = false;
  }

  onClick(): void {
    if(this.timer) {
      clearTimeout(this.timer);
    }
    if(!this.isLongClick && this.userService.getOpponent()) {
      this.socket.emit(Constants.EVENTS.gameShot, {shot: {x: this.x, y: this.y}});
    }
    this.isLongClick = false;
  }

  onClickDown(): void {
    let me = this;
    me.isLongClick = false;
    if(me.timer) {
      clearTimeout(me.timer);
    }
    me.timer = setTimeout(() => {
      me.isLongClick = true;
      if(me.userService.getOpponent()) {
        me.socket.emit(Constants.EVENTS.gameMark, {mark: {x: me.x, y: me.y}});
      }
    }, 1000);
  }
}
