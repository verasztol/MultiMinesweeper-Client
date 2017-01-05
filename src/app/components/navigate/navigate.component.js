"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var NavigateComponent = (function () {
    function NavigateComponent(router, socketService, userService) {
        this.router = router;
        this.socketService = socketService;
        this.userService = userService;
        this.socket = null;
        this.socket = this.socketService.getSocket();
    }
    NavigateComponent.prototype.ngOnInit = function () {
        var me = this;
        if (me.socket) {
            me.socket.on('connect', function () {
                console.log("client connected");
                me.goToLogin();
            });
            me.socket.on('user.added', function (data) {
                console.log("added", data);
                if (data && data.name) {
                    me.userService.createUser(data.name);
                    me.goToPlayers();
                }
                else {
                }
            });
            me.socket.on('user.declinedPlay', function (data) {
                console.log("user.declinedPlay", data);
            });
            me.socket.on('user.acceptedPlay', function (data) {
                console.log("user.acceptedPlay", data);
                if (data && data.enemyName) {
                    me.userService.createOpponent(data.enemyName);
                }
                else {
                }
            });
        }
    };
    NavigateComponent.prototype.goToLogin = function () {
        this.router.navigate(['/login']);
    };
    NavigateComponent.prototype.goToPlayers = function () {
        this.router.navigate(['/dashboard']);
    };
    NavigateComponent = __decorate([
        core_1.Component({
            selector: 'navigate',
            templateUrl: './navigate.component.html'
        })
    ], NavigateComponent);
    return NavigateComponent;
}());
exports.NavigateComponent = NavigateComponent;
