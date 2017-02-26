import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectWaitingComponent }   from './components/connect-waiting/connect.waiting.component';
import { LoginComponent }   from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import {GameComponent} from "./components/game/game.component";
import {SocketGuard} from "./services/guard.service";
import {LoginGuard} from "./services/login.guard.service";
import {PlayingGuard} from "./services/playing.guard.service";
import {GameGuard} from "./services/game.guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'connect-waiting',  component: ConnectWaitingComponent },
  { path: 'login',  component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SocketGuard] },
  { path: 'game',  component: GameComponent, canActivate: [GameGuard], canDeactivate: [PlayingGuard] }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    SocketGuard,
    LoginGuard,
    PlayingGuard,
    GameGuard
  ]
})
export class AppRoutingModule {}
