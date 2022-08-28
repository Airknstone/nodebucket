/***************************************************
Title: dialog-box.component.ts
Author: Professor Krasso
Date: 08-28-2022
Modified By: Allan Trejo
Description: dialog component to add a new task
Code Attribution: https://mongoosejs.com
                  https://expressjs.com
                  https://www.mongodb.com
                  https://swagger.io

***********************************************/
/* requirements */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: [ './dialog-box.component.css' ]
})
export class DialogBoxComponent implements OnInit {

  /*Form initalization and validation   */
  taskForm: FormGroup = this.fb.group({
    task: [ null, Validators.compose([ Validators.required, Validators.minLength(3), Validators.maxLength(35) ]) ]
  });
  /* Dependency injection */
  constructor (private fb: FormBuilder, public dialogRef: MatDialogRef<DialogBoxComponent>) { }

  ngOnInit(): void {
  }

  /* passes values to parent component when form is submitted */
  passToParent() {
    const newTask = this.taskForm.controls[ 'task' ].value;
    console.log(newTask);
    this.dialogRef.close(newTask);
  }

  /* closes modal and passed nothing. */
  closeDialog() {
    this.dialogRef.close();
  }
}
