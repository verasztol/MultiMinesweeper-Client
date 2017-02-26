import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "../../services/socket.service";
import {UserService} from "../../services/user.service";
import {CustomModalComponent} from "../modal-dialog/modal.dialog.component";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
import {Constants} from '../../constants';

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
        console.log(Constants.EVENTS.userAcceptedPlay, data);
        if(data && data.enemyName) {
          me.userService.createOpponent(data.enemyName);
          me.socket.emit(Constants.EVENTS.gameStart);
        }
        else {
          // TODO
        }
      };

      let gameStartedListener = (data) => {
        console.log("game started", data);

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

      me.socket.addSingleListener(Constants.EVENTS.connectError, errorListener);
      me.socket.addMultipleListener(Constants.EVENTS.connect, connectListener, "connectListenerFromNavigate");
      me.socket.addSingleListener(Constants.EVENTS.userAdded, userAddedListener);
      me.socket.addSingleListener(Constants.EVENTS.userAcceptedPlay, acceptedPLayListener);
      me.socket.addSingleListener(Constants.EVENTS.gameStarted, gameStartedListener);
      me.socket.addMultipleListener(Constants.EVENTS.gameEnd, gameEndListener, "gameEndListenerFromNavigate");
    }
  }

  goToLogin(): void {
    this.userService.logout();
    this.router.navigate([Constants.PAGES.login]);
  }

  goToPlayers(): void {
    this.router.navigate([Constants.PAGES.dashboard]);
  }

  goToGame(): void {
    this.router.navigate([Constants.PAGES.game]);
  }

  gotoServerWaiting(): void {
    this.router.navigate([Constants.PAGES.connectWaiting]);
  }
}
