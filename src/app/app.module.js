"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var login_component_1 = require('./components/login/login.component');
var connect_waiting_component_1 = require('./components/connect-waiting/connect.waiting.component');
var players_component_1 = require('./components/dashboard/players/players.component');
var player_component_1 = require('./components/dashboard/player/player.component');
var navigate_component_1 = require("./components/navigate/navigate.component");
var modal_dialog_component_1 = require("./components/modal-dialog/modal.dialog.component");
var challenger_component_1 = require("./components/dashboard/challengers/challenger.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var app_routing_module_1 = require('./app-routing.module');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var socket_service_1 = require("./services/socket.service");
var user_service_1 = require("./services/user.service");
var challengers_service_1 = require("./services/challengers.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                connect_waiting_component_1.ConnectWaitingComponent,
                navigate_component_1.NavigateComponent,
                players_component_1.PlayersComponent,
                player_component_1.PlayerComponent,
                modal_dialog_component_1.ModalDialogComponent,
                challenger_component_1.ChallengerComponent,
                dashboard_component_1.DashboardComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_bs3_modal_1.Ng2Bs3ModalModule
            ],
            providers: [socket_service_1.SocketService, user_service_1.UserService, challengers_service_1.ChallengersService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
