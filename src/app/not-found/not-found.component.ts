/***************************************************
Title: not-found.component.ts
Author: Professor Krasso
Date: 09-03-2022
Modified By: Allan Trejo
Description: 404 component
Code Attribution: https://material.angular.io
                  https://angular.io

***********************************************/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.css' ]
})
export class NotFoundComponent implements OnInit {

  constructor () { }

  ngOnInit(): void {
  }

}
