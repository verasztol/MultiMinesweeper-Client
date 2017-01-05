"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require('../models/user');
var UserService = (function () {
    function UserService() {
        this.user = null;
        this.opponent = null;
    }
    UserService.prototype.createUser = function (name) {
        this.user = new user_1.User(name);
    };
    UserService.prototype.createOpponent = function (name) {
        this.opponent = new user_1.User(name);
    };
    UserService.prototype.getUserName = function () {
        return this.user ? this.user.name : null;
    };
    UserService.prototype.getOpponentName = function () {
        return this.opponent ? this.opponent.name : null;
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
