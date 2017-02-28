import {Component, OnInit, OnDestroy} from '@angular/core';
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
export class NavigateComponent implements OnInit, OnDestroy {

  private socket: any = null;
  private errorListener: Function = null;
  private connectListener: Function = null;
  private userAddedListener: Function = null;
  private acceptedPLayListener: Function = null;
  private gameStartedListener: Function = null
  private gameEndListener: Function = null;

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

      me.errorListener = () => {
        console.log("connect failed");
        me.gotoServerWaiting();
      };

      me.connectListener = () => {
        console.log("client connected");
        me.goToLogin();
      };

      me.userAddedListener = (data) => {
        console.log("added", data);
        if(data && data.name) {
          me.userService.createUser(data.name);
          me.goToPlayers();
        }
        else {
          // TODO
        }
      };

      me.acceptedPLayListener = (data) => {
        console.log(Constants.EVENTS.userAcceptedPlay, data);
        if(data && data.enemyName) {
          me.userService.createOpponent(data.enemyName);
          me.socket.emit(Constants.EVENTS.gameStart);
        }
        else {
          // TODO
        }
      };

      me.gameStartedListener = (data) => {
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

      me.gameEndListener = (data) => {
        console.log("end", data);
        me.userService.resetOpponent();
        console.log("reset", me.userService.getOpponent());
        let title = (data.type === Constants.GAME_END_TYPES.userLeft) ? "Your opponent left" : "End game";
        me.modal.open(CustomModalComponent,  overlayConfigFactory({
          title: title,
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

      me.socket.addSingleListener(Constants.EVENTS.connectError, me.errorListener);
      me.socket.addMultipleListener(Constants.EVENTS.connect, me.connectListener, "connectListenerFromNavigate");
      me.socket.addSingleListener(Constants.EVENTS.userAdded, me.userAddedListener);
      me.socket.addSingleListener(Constants.EVENTS.userAcceptedPlay, me.acceptedPLayListener);
      me.socket.addSingleListener(Constants.EVENTS.gameStarted, me.gameStartedListener);
      me.socket.addMultipleListener(Constants.EVENTS.gameEnd, me.gameEndListener, "gameEndListenerFromNavigate");
    }
  }

  ngOnDestroy(): void {
    this.socketService.removeListener(Constants.EVENTS.connectError, this.errorListener);
    this.socketService.removeListener(Constants.EVENTS.connect, this.connectListener);
    this.socketService.removeListener(Constants.EVENTS.userAdded, this.userAddedListener);
    this.socketService.removeListener(Constants.EVENTS.userAcceptedPlay, this.acceptedPLayListener);
    this.socketService.removeListener(Constants.EVENTS.gameStarted, this.gameStartedListener);
    this.socketService.removeListener(Constants.EVENTS.gameEnd, this.gameEndListener);
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
