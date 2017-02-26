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

      let errorListener = () => {
        console.log("connect failed");
        me.gotoServerWaiting();
      };

      let connectListener = () => {
        console.log("client connected");
        me.goToLogin();
      };

      let userAddedListener = (data) => {
        console.log("added", data);
        if(data && data.name) {
          me.userService.createUser(data.name);
          me.goToPlayers();
        }
        else {
          // TODO
        }
      };

      let acceptedPLayListener = (data) => {
        console.log("user.acceptedPlay", data);
        if(data && data.enemyName) {
          me.userService.createOpponent(data.enemyName);
          me.socket.emit("game.start");
        }
        else {
          // TODO
        }
      };

      let gameStartedListener = (data) => {
        console.log("game.started", data);

        if(data && data.game && data.nextPlayerName) {
          me.userService.createGame(data.game.width, data.game.height, data.game.mineCount, data.game.maxMarker);
          me.userService.setStarterPlayerName(data.nextPlayerName);
          me.goToGame();
        }
        else {
          // TODO
        }
      };

      let gameEndListener = (data) => {
        console.log("end", data);
        me.userService.resetOpponent();
        console.log("reset", me.userService.getOpponent());
        me.modal.open(CustomModalComponent,  overlayConfigFactory({
          title: "End Game",
          text: "The winner is: " + data.winner,
          cancelBtnText: "Back to the field",
          okBtnText: "New game",
          ok: () => {
            me.goToPlayers();
          },
          cancel: () => {

          }
        }, BSModalContext));
      };

      me.socket.addSingleListener('connect_error', errorListener);
      me.socket.on('connect', connectListener);
      me.socket.addSingleListener('user.added', userAddedListener);
      me.socket.addSingleListener('user.acceptedPlay', acceptedPLayListener);
      me.socket.addSingleListener('game.started', gameStartedListener);
      me.socket.on('game.end', gameEndListener);
    }
  }

  goToLogin(): void {
    this.userService.logout();
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
