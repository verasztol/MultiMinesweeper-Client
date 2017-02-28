import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {Constants} from "../../../constants";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private socket: any = null;
  private userDeclinedListener: Function = null;

  waiting: boolean = false;

  @Input() name:string = "";

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    me.userDeclinedListener = (data) => {
      console.log("user declinedPlay", data);
      if(data && data.enemyName === me.name) {
        me.waiting = false;
      }
    };

    me.socket.addSingleListener(Constants.EVENTS.userDeclinedPlay, me.userDeclinedListener);
  }

  ngOnDestroy(): void {
    this.socketService.removeListener(Constants.EVENTS.userDeclinedPlay, this.userDeclinedListener);
  }

  select(): void {
    this.waiting = true;
    this.socket.emit(Constants.EVENTS.userSelect, {userName: this.name});
  }
}
