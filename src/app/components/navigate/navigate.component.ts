import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";
import {ModalService} from "../modal-dialog/modal.dialog.module";
import {AppModule} from "../../app.module";
import {CustomModalComponent} from "../modal-dialog/modal.dialog.component";

@Component({
  selector: 'navigate',
  templateUrl: './navigate.component.html'
})
export class NavigateComponent implements OnInit {

  private socket = null;

  constructor(
    private router: Router,
    private socketService: SocketService,
    private modalService: ModalService,
    private userService: UserService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    if(me.socket) {
      me.socket.on('connect', function(){
        console.log("client connected");
        me.goToLogin();
      });

      me.socket.on('user.added', function(data) {
        console.log("added", data);
        if(data && data.name) {
          me.userService.createUser(data.name);
          me.goToPlayers();
        }
        else {
          // TODO
        }
      });

      me.socket.on('user.declinedPlay', function(data) {
        console.log("user.declinedPlay", data);
      });

      me.socket.on('user.acceptedPlay', function(data) {
        console.log("user.acceptedPlay", data);
        if(data && data.enemyName) {
          me.userService.createOpponent(data.enemyName);
          me.socket.emit("game.start");
        }
        else {
          // TODO
        }
      });

      me.socket.on('game.started', function(data) {
        console.log("game.started", data);

        if(data && data.game && data.nextPlayerName) {
          me.userService.createGame(data.game.width, data.game.height, data.game.mineCount, data.game.maxMarker);
          me.userService.setStarterPlayerName(data.nextPlayerName);
          me.goToGame();
        }
        else {
          // TODO
        }
      });


      me.socket.on('game.end', function(data) {
        console.log("end", data);
        let modal = me.modalService.create(AppModule, CustomModalComponent, {
          ok: () => {
            me.goToPlayers();
          },
          title: "End Game",
          text: "The winner is: " + data.winner
        });
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToPlayers(): void {
    this.router.navigate(['/dashboard']);
  }

  goToGame(): void {
    this.router.navigate(['/game']);
  }
}
