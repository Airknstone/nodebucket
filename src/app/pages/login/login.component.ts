import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Message } from 'primeng//api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  errorMessages: Message[] = [];
  employee: Employee;
  loginForm: FormGroup = this.fb.group({
    empId: [ null, Validators.compose([ Validators.required, Validators.pattern('[0-9]*$') ]) ]
  });
  constructor (private fb: FormBuilder, private router: Router, private cookieService: CookieService,
    private http: HttpClient, private sessionService: SessionService) {
    this.employee = {} as Employee;
  }

  ngOnInit(): void {
  }

  login() {
    const empId = this.loginForm.controls[ 'empId' ].value;

    console.log(empId);

    this.sessionService.findEmployeeById(empId).subscribe({
      next: (res) => {
        if (res) {
          this.employee = res;
          this.cookieService.set('session_user', this.employee.empId.toString(), 1);
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate([ '/' ]);
        } else {
          this.errorMessages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: " - Enter a valid Employee Id to Continue"
            }
          ];
        }
      },
      error: (error) => {
        console.log(error);
        this.errorMessages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: error.message
          }
        ];
      }
    });
  }
}
