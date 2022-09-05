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
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  /* Delete task initiate dialog on click */
  deleteTask(taskId: string) {
    /* lcal variables */
    let dialogData = {} as DialogData;
    dialogData.header = " Delete Record Dialog";
    dialogData.body = " Are you sure you want to delete this record?";

    /* set up angulr material dialog component */
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      /* pass data as DialogData interface */
      data: dialogData,
      /* only close when button clicked */
      disableClose: true
    });

    /* subscribe to close event */
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        /* confirm is passed from confirm button in dialog component,  */
        if (result === 'confirm') {
          /* Call delete api */
          this.taskService.deleteTask(this.empId, taskId).subscribe({
            next: (res) => {
              this.employee = res.data;
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              /* on complete update lists */
              this.todo = this.employee.todo;
              this.done = this.employee.done;
            }
          });
        }
      }
    });
  }
  /* Drag and drop Material angular */
  drop(event: CdkDragDrop<any[]>) {
    /* if droped into same list */
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('reodered tasks in the same column');
      /*Drop events updates todo or done lists */
      this.updateTaskList(this.empId, this.todo, this.done);
    }/* moved to different container */
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      console.log('Moved tasks to a new column');
      /*  drop event updates todo or done list */
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  /* Updates tasks  */
  updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    /* updates todo and done lists  */
    this.taskService.updateTask(empId, todo, done).subscribe({
      next: (res) => {
        this.employee = res.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log(this.employee);
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    });
  }

}
