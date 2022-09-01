/***************************************************
Title: tasks.service.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Service for managing tasks of a user using API
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor (private http: HttpClient) { }

  /* findAllTasks
   */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get(`/api/employees/${empId}/tasks`);
  }

  /* createTasks */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post(`/api/employees/${empId}/tasks`, {
      text: task
    });
  }

  /* UpdateTask */

  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put(`/api/employees/${empId}/tasks`, {
      todo, done
    });
  }

  /* deleteTask  */
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete(`/api/employees/${empId}/tasks/${taskId}`);
  }
}
