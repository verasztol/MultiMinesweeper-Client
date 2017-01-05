import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from "../../../models/user";

@Component({
  selector: 'player-data',
  templateUrl: './player.data.component.html',
  styleUrls: ['./player.data.component.css']
})
export class PlayerDataComponent implements OnChanges {
  name: string = null;

  @Input() player: User = null;
  @Input() actualPlayerName: string = "";

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes);
    let tmpUser = changes["player"];
    if(tmpUser && tmpUser.currentValue) {
      this.name = tmpUser.currentValue.name;
    }
  }
}
