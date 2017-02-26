import { Injectable } from '@angular/core';
import { User }    from '../models/user';
import {Game} from "../models/game";

@Injectable()
export class UserService {
  private user: User = null;
  private opponent: User = null;
  private game: Game = null;
  private starterPlayerName: string = null;

  createUser(name: string): void {
    this.user = new User(name);
  }

  createOpponent(name: string): void {
    this.opponent = new User(name);
  }

  createGame(width: number, height: number, mineCount: number, maxMarker: number): void {
    this.game = new Game(width, height, mineCount, maxMarker);
  }

  setStarterPlayerName(starterPlayerName: string): void {
    this.starterPlayerName = starterPlayerName;
  }

  getUser(): User {
    return this.user;
  }

  getOpponent(): User {
    return this.opponent;
  }

  getGame(): Game {
    return this.game;
  }

  getStarterPlayerName(): string {
    return this.starterPlayerName;
  }

  logout(): void {
    this.user = null;
    this.opponent = null;
  }

  resetOpponent(): void {
    this.opponent = null;
  }
}
