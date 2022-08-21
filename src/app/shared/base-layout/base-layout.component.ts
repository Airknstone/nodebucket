/***************************************************
Title: base-layout.component.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Main layout for application
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: [ './base-layout.component.css' ]
})
export class BaseLayoutComponent implements OnInit {

  /**********************************
   *  local variables */


  /*holds cookie session name */
  sessionName: string;
  /* Holds current date  */
  year: number;

  constructor (private router: Router, private cookieService: CookieService) {
    this.sessionName = this.cookieService.get('session_name');
    this.year = Date.now();
  }

  ngOnInit(): void {
  }

  /* Click Event Handler to logout, deletes cookies and returns to login page */
  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate([ '/session/login' ]);
  }
}
