import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from "./components/modal-dialog/modal.dialog.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConnectWaitingComponent } from './components/connect-waiting/connect.waiting.component';
import { PlayersComponent } from './components/dashboard/players/players.component';
import { PlayerComponent } from './components/dashboard/player/player.component';
import { NavigateComponent } from "./components/navigate/navigate.component";
import { ChallengersComponent } from "./components/dashboard/challengers/challengers.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GameComponent } from "./components/game/game.component";
import {PlayerDataComponent} from "./components/game/player-data/player.data.component";
import {GameDataComponent} from "./components/game/game-data/game.data.component";
import {FieldComponent} from "./components/game/fields/field/field.component";
import {FieldsComponent} from "./components/game/fields/fields.component";
import {CustomModalComponent} from "./components/modal-dialog/modal.dialog.component";

import { AppRoutingModule } from './app-routing.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SocketService } from "./services/socket.service";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConnectWaitingComponent,
    NavigateComponent,
    PlayersComponent,
    PlayerComponent,
    ChallengersComponent,
    DashboardComponent,
    GameComponent,
    PlayerDataComponent,
    GameDataComponent,
    FieldComponent,
    FieldsComponent,
    CustomModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    ModalModule
  ],
  providers: [SocketService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
