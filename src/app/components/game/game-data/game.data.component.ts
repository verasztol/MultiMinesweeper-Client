import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../models/game";

@Component({
  selector: 'game-data',
  templateUrl: './game.data.component.html',
  styleUrls: ['./game.data.component.css']
})
export class GameDataComponent implements OnInit {
  mineCount: number = null;
  maxMarker: number = null;

  @Input() game: Game = null;

  ngOnInit(): void {
    if(this.game) {
      this.mineCount = this.game.mineCount;
      this.maxMarker = this.game.maxMarker;
    }
  }
}
