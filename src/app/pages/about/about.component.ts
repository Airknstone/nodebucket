/***************************************************
Title: about.component.ts
Author: Professor Krasso
Date: 09-03-2022
Modified By: Allan Trejo
Description: About page
Code Attribution: https://material.angular.io
                  https://angular.io

***********************************************/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [ './about.component.css' ]
})
export class AboutComponent implements OnInit {
  /* local variabled used for checklist for loop */
  listOfAwesome: string[] = [ 'Peace of Mind', 'Focused Results', 'Time Saver', 'Gryffindor Magic', 'Efficient at everything!' ];
  constructor () { }

  ngOnInit(): void {
  }

}
