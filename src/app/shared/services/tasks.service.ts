import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.post(`/api/tasks/${empId}/tasks`, {
      text: task
    });
  }
}
