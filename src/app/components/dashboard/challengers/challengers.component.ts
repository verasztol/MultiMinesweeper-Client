import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {UserService} from "../../../services/user.service";

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

    me.socket.on('user.wantPlay', function(data) {
      console.log("user.wantPlay", data);
      if(data && data.challengerName) {
        if(me.challengers.indexOf(data.challengerName) === -1) {
          me.challengers.push(data.challengerName);
        }
      }
      else {
        // TODO
      }
    });
  }

  accept(challenger): void {
    this.socket.emit('user.answerPlay', {userName: challenger, answer: "yes"});
    this.userService.createOpponent(challenger);
  }

  decline(challenger): void {
    this.challengers = this.challengers.filter(c => c !== challenger);
    this.socket.emit('user.answerPlay', {userName: challenger, answer: "no"});
  }
}
