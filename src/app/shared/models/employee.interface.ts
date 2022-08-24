/***************************************************
Title: employee.interface.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: interface for employee
Code Attribution: https://material.angular.io
                  https://angular.io
                  https://rxjs.dev
***********************************************/
import { Item } from './item.interface';
export interface Employee {
  empId: number;
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];
}
