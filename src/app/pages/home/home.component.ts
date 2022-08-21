/***************************************************
Title: home.component.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: content section component
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  constructor () { }

  ngOnInit(): void {
  }

}
