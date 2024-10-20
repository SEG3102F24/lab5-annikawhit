import { Injectable, inject, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";
import { EmployeeDbService } from '../firestore/employee-db.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  employees$: Observable<Employee[]> = new Observable<Employee[]>;
  currentEmployee: Employee | null = null;
  private store: EmployeeDbService = inject(EmployeeDbService);
  

  getListOfEmployees(): Observable<Employee[]> {
    return this.store.getEmployees();
  }

  addEmployee(employee: Employee) {
    this.store.createEmployee(employee);
  }
}
