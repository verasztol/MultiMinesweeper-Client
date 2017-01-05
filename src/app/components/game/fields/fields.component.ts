import {Component, OnInit, Input} from '@angular/core';
import {SocketService} from "../../../services/socket.service";
import {Game} from "../../../models/game";

@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  private socket = null;
  private width: number = null;
  private height: number = null;
  private row: any = [];
  private col: any = [];

  @Input() game: Game = null;

  constructor(
    private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  ngOnInit(): void {
    if(this.game) {
      this.width = this.game.width;
      this.height = this.game.height;
      this.row = Array(this.width).fill(1).map((x,i)=>i);
      this.col = Array(this.height).fill(1).map((x,i)=>i);
    }
  }
}
