"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DashboardComponent = (function () {
    function DashboardComponent(socketService, challengersService) {
        this.socketService = socketService;
        this.challengersService = challengersService;
        this.socket = null;
        this.challengers = [];
        this.socket = this.socketService.getSocket();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var me = this;
        me.socket.on('user.wantPlay', function (data) {
            console.log("user.wantPlay", data);
            if (data) {
                me.challengers = me.challengersService.addChallenger(data.challengerName);
            }
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
