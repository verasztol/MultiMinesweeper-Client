import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate() {
    return (!this.userService || !this.userService.getUser() || !this.userService.getUser().name);
  }
}
