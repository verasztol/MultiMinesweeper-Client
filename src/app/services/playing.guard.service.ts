import { Injectable }     from '@angular/core';
import {Router, CanDeactivate, NavigationCancel}    from '@angular/router';
import {Observable} from "rxjs";
import {Constants} from "../constants";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class PlayingGuard implements CanDeactivate<CanComponentDeactivate> {

  private canGo: boolean = false;

  constructor(
    private router: Router) {
    let me = this;
    router
      .events
      .filter(e => e instanceof NavigationCancel)
      .subscribe((e) => {
      if(e.url === Constants.PAGES.connectWaiting) {
        me.canGo = true;
        me.router.navigate([Constants.PAGES.connectWaiting]);
      }
    })
  }

  canDeactivate(component: CanComponentDeactivate) {
    if(this.canGo) {
      return true;
    }
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
