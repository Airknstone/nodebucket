/***************************************************
Title: session.service.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Service to manage sessions with API call
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /* Inject Dependencies */
  constructor (private http: HttpClient) { }

  /*
  findEmployeeById - http request
  get()
    Constructs an observable that, when subscribed, causes the configured GET request to execute on the server.
   */

  findEmployeeById(empId: number): Observable<any> {
    return this.http.get(`/api/employees/${empId}`);
  }
}
