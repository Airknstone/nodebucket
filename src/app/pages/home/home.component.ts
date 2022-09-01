/***************************************************
 Title: home.component.ts
 Author: Professor Krasso
 Date: 08-20-2022
 Modified By: Allan Trejo
 Description: content section component
 Code Attribution: https://material.angular.io
 https://angular.io
 https://rxjs.dev
 ***********************************************/
import { Component, OnInit } from '@angular/core';

import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TasksService } from '../../shared/services/tasks.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../shared/models/dialog-data.interface';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  /* local variables */
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  /* dependency injection */
  constructor (private cookieService: CookieService, private taskService: TasksService, public dialog: MatDialog) {
    /* initialize variables on render */
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];
    /* subscribe to http call from taskService */
    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);

      },
      error: (err) => {
        console.log(err.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }

    });
  }

  /* Opens Dialog on press from create task button in UI */
  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '750px'

    });
    /* listens to event data passed down from dialog when closed */
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      /* if there is data, pass it to createTask function */
      if (data) {
        this.createTask(data);
      }
    });
  }

  ngOnInit(): void {
  }
  /* when task is created, Post to database using createTask service from taskService */
  createTask(newTask: string) {
    console.log(newTask);
    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        /*             this.taskForm.controls[ 'task' ].setErrors({
                      'incorrect': false
                    }); */
      }
    });
  }

  deleteTask(taskId: string) {
    let dialogData = {} as DialogData;
    dialogData.header = " Delete Record Dialog";
    dialogData.body = " Are you sure you want to delete this record?";

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.taskService.deleteTask(this.empId, taskId).subscribe({
            next: (res) => {
              this.employee = res.data;
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              this.todo = this.employee.todo;
              this.done = this.employee.done;
            }
          });
        }
      }
    });
  }

}
