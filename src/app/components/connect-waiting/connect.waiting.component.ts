import { Component } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './connect.waiting.component.html',
  styleUrls: ['./connect.waiting.component.css']
})
export class ConnectWaitingComponent {
  waiting = 'Connection lost, connecting...';
}
