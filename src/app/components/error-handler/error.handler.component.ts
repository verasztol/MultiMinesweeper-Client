import {Component, OnInit, OnDestroy} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Constants} from "../../constants";

@Component({
  selector: 'error-handler',
  templateUrl: './error.handler.component.html',
  styleUrls: ['./error.handler.component.css']
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {

  private socket: any = null;
  private timer: any = null;
  private userErrorListener: Function = null;
  private gameWarnListener: Function = null;

  text: string = null;

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    if(me.socket) {

      me.userErrorListener = (data) => {
        console.log("user error", data);

        if(me.timer) {
          clearTimeout(me.timer);
        }

        if(data && data.message) {
          me.text = data.message;
          me.initTimer();
        }
      };

      me.gameWarnListener = (data) => {
        console.log("game warn", data);

        if(me.timer) {
          clearTimeout(me.timer);
        }

        if(data && data.message) {
          me.text = data.message;
          me.initTimer();
        }
      };

      me.socket.on(Constants.EVENTS.userError, me.userErrorListener);
      me.socket.on(Constants.EVENTS.gameWarn, me.gameWarnListener);
    }
  }

  ngOnDestroy(): void {
    this.socketService.removeListener(Constants.EVENTS.userError, this.userErrorListener);
    this.socketService.removeListener(Constants.EVENTS.gameWarn, this.gameWarnListener);
  }

  initTimer() {
    let me = this;
    me.timer = setTimeout(() => {
      me.text = null;
    }, 5000);
  }
}
