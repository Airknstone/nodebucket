/***************************************************
Title: auth.guard.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Route Guard for login component using cookies to determine user credentials
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /* inject dependencies */
  constructor (private router: Router, private cookieService: CookieService) { }

  /* sets up guard to activate base component layout at route / */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    /* stores Session_user Cookie if available */
    const sessionUser = this.cookieService.get('session_user');
    console.log(sessionUser);

    /* if session user valid return true */
    if (sessionUser) {
      return true;
    } else {
      /* if false reroute to login component*/

      this.router.navigate([ '/session/login' ]);
      return false;
    }

  }

}
