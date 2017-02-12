import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";
import {CustomModalComponent} from "../modal-dialog/modal.dialog.component";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';

@Component({
  selector: 'navigate',
  templateUrl: './navigate.component.html',
  providers: [Modal]
})
export class NavigateComponent implements OnInit {

  private socket = null;

  constructor(
    private router: Router,
    private socketService: SocketService,
    private userService: UserService,
    public modal: Modal) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    let me = this;

    if(me.socket) {
      me.socket.on('connect_error', () => {
        console.log("connect failed");
        me.gotoServerWaiting();
      });

      me.socket.on('connect', () => {
        console.log("client connected");
        me.goToLogin();
      });

      me.socket.on('user.added', (data) => {
        console.log("added", data);
        if(data && data.name) {
          me.userService.createUser(data.name);
          me.goToPlayers();
        }
        else {
          // TODO
        }
      });

      me.socket.on('user.declinedPlay', (data) => {
        console.log("user.declinedPlay", data);
      });

      me.socket.on('user.acceptedPlay', (data) => {
        console.log("user.acceptedPlay", data);
        if(data && data.enemyName) {
          me.userService.createOpponent(data.enemyName);
          me.socket.emit("game.start");
        }
        else {
          // TODO
        }
      });

      me.socket.on('game.started', (data) => {
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


      me.socket.on('game.end', (data) => {
        console.log("end", data);
        return me.modal.open(CustomModalComponent,  overlayConfigFactory({
          title: "End Game",
          text: "The winner is: " + data.winner,
          ok: () => {
            me.goToPlayers();
          }
        }, BSModalContext));
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

  gotoServerWaiting(): void {
    this.router.navigate(['/connect-waiting']);
  }
}
