import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Firestore,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import { Employee } from 'src/app/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDbService {
  private firestore: Firestore = inject(Firestore);

  getEmployees(): Observable<Employee[]> {
    const employeesCollec = collection(this.firestore, 'employees');
    return collectionData(employeesCollec, { idField: 'id' }).pipe(
      map(employees => employees.map(emp => ({
        id: emp.id,
        name: emp['name'],
        city: emp['city'],
        gender: emp['gender'],
        salary: emp['salary'],
        email: emp['email'],
        dateOfBirth: emp['dateOfBirth'].toDate(),
      })))
    );
  }

  createEmployee(employee: Employee) {
      const employees = collection(this.firestore, 'employees');
      delete employee.id;
      return addDoc(employees, {...employee});
  }
}