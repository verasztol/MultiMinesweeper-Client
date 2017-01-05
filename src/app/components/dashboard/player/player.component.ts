import {Component, Input } from '@angular/core';
import {SocketService} from "../../../services/socket.service";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  private socket = null;

  @Input() name:string = "";

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  select(): void {
    this.socket.emit('user.select', {userName: this.name});
  }
}
