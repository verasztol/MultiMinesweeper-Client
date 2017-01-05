"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ChallengerComponent = (function () {
    function ChallengerComponent(socketService) {
        this.socketService = socketService;
        this.socket = null;
        this.challenger = "";
        this.deleteChallenge = null;
        this.socket = this.socketService.getSocket();
    }
    ChallengerComponent.prototype.accept = function () {
        this.socket.emit('user.answerPlay', { userName: this.challenger, answer: "yes" });
    };
    ChallengerComponent.prototype.decline = function () {
        this.socket.emit('user.answerPlay', { userName: this.challenger, answer: "no" });
        if (this.deleteChallenge) {
            this.deleteChallenge(this.challenger);
        }
    };
    __decorate([
        core_1.Input()
    ], ChallengerComponent.prototype, "challenger", void 0);
    __decorate([
        core_1.Input()
    ], ChallengerComponent.prototype, "deleteChallenge", void 0);
    ChallengerComponent = __decorate([
        core_1.Component({
            selector: 'challenger',
            templateUrl: './challenger.component.html',
            styleUrls: ['./challenger.component.css']
        })
    ], ChallengerComponent);
    return ChallengerComponent;
}());
exports.ChallengerComponent = ChallengerComponent;
