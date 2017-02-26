import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {UserService} from "../../../services/user.service";
import {Constants} from "../../../constants";

@Component({
  selector: 'challengers',
  templateUrl: './challengers.component.html',
  styleUrls: ['./challengers.component.css']
})
export class ChallengersComponent implements OnInit {

  private socket = null;
  private challengers = [];

  constructor(
    private socketService: SocketService,
    private userService: UserService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    let userWantPlayListener = (data) => {
      console.log("user want play", data);
      if(data && data.challengerName) {
        if(me.challengers.indexOf(data.challengerName) === -1) {
          me.challengers.push(data.challengerName);
        }
      }
      else {
        // TODO
      }
    };

    me.socket.addSingleListener(Constants.EVENTS.userWantPlay, userWantPlayListener);
  }

  accept(challenger): void {
    this.socket.emit(Constants.EVENTS.userAnswerPlay, {userName: challenger, answer: "yes"});
    this.userService.createOpponent(challenger);
  }

  decline(challenger): void {
    this.challengers = this.challengers.filter(c => c !== challenger);
    this.socket.emit(Constants.EVENTS.userAnswerPlay, {userName: challenger, answer: "no"});
  }
}
