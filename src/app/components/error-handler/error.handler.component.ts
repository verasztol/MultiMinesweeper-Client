import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Constants} from "../../constants";

@Component({
  selector: 'error-handler',
  templateUrl: './error.handler.component.html',
  styleUrls: ['./error.handler.component.css']
})
export class ErrorHandlerComponent implements OnInit{

  private socket = null;
  private timer = null;
  text: string = null;

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    if(me.socket) {

      let userErrorListener = (data) => {
        console.log("user error", data);

        if(me.timer) {
          clearTimeout(me.timer);
        }

        if(data && data.message) {
          me.text = data.message;
          me.initTimer();
        }
      };

      let gameWarnListener = (data) => {
        console.log("game warn", data);

        if(me.timer) {
          clearTimeout(me.timer);
        }

        if(data && data.message) {
          me.text = data.message;
          me.initTimer();
        }
      };

      me.socket.addSingleListener(Constants.EVENTS.userError, userErrorListener);
      me.socket.addSingleListener(Constants.EVENTS.gameWarn, gameWarnListener);
    }
  }

  initTimer() {
    let me = this;
    me.timer = setTimeout(() => {
      me.text = null;
    }, 5000);
  }
}
