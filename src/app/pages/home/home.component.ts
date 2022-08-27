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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;


  constructor (private cookieService: CookieService, private taskService: TasksService, public dialog: MatDialog) {

    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];

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

  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '750px'

    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data) {
        this.createTask(data);
      }
    });
  }

  ngOnInit(): void {
  }
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

}
