/***************************************************
Title: dialog-data.component.ts
Author: Professor Krasso
Date: 09-03-2022
Modified By: Allan Trejo
Description: delete dialog component
Code Attribution: https://material.angular.io
                  https://angular.io

***********************************************/

import { DialogData } from './../models/dialog-data.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ './confirm-dialog.component.css' ]
})
export class ConfirmDialogComponent implements OnInit {
  /* local variable */
  dialogData: DialogData;
  /* inject dependencies */
  constructor (@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    /* initialize component with data */
    this.dialogData = data;
  }

  ngOnInit(): void {
  }

}
