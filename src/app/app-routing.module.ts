import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectWaitingComponent }   from './components/connect-waiting/connect.waiting.component';
import { LoginComponent }   from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import {GameComponent} from "./components/game/game.component";
import {SocketGuard} from "./services/guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/connect-waiting', pathMatch: 'full' },
  { path: 'connect-waiting',  component: ConnectWaitingComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SocketGuard] },
  { path: 'game',  component: GameComponent, canActivate: [SocketGuard] }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    SocketGuard
  ]
})
export class AppRoutingModule {}
