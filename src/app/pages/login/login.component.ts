/***************************************************
Title: login.component.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Login component, sets up cookies and http request to login
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Message } from 'primeng//api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  /* ********************************
  Local Variables
  ******************************** */

  errorMessages: Message[] = [];

  employee: Employee;
  /* boolean for progress indicator */
  isLoading: Boolean = false;
  loginForm: FormGroup = this.fb.group({
    /* form validation, must be numbers */
    empId: [ null, Validators.compose([ Validators.required, Validators.pattern('[0-9]*$') ]) ]
  });
  /* Inject Dependancies   */
  constructor (private fb: FormBuilder, private router: Router, private cookieService: CookieService,
    private sessionService: SessionService) {
    /* initalize employee object  */
    this.employee = {} as Employee;
  }

  ngOnInit(): void {
  }

  /* form submission event */
  login() {
    /* On login, determine if http request was successful*/
    const empId = this.loginForm.controls[ 'empId' ].value;
    this.isLoading = true;
    console.log(empId);

    /* call http request */
    this.sessionService.findEmployeeById(empId).subscribe({
      next: (res) => {
        console.log(res);
        /* on success set cookiesService and navigate to base component */
        if (res.data) {
          this.employee = res.data;
          this.cookieService.set('session_user', this.employee.empId.toString(), 1);
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate([ '/' ]);
        } else {
          /* else return errors and populate message array */
          this.isLoading = false;
          this.errorMessages = [
            {
              severity: 'error',
              summary: 'Error - ',
              detail: res.message
            }
          ];
        }
      },
      error: (error) => {
        /* if server throws return error message*/
        console.log(error);
        this.errorMessages = [
          {
            severity: 'error',
            summary: 'Error - ',
            detail: error.message
          }
        ];
      }
    });
  }
}
