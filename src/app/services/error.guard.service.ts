import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class ErrorGuard implements CanActivate {

  canActivate() {
    return true;
  }
}
