import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student_URL, StudentDepartman_URL } from '../app.constants';
import { Student } from '../models/student';
import { Departman } from '../models/departman';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
  
  constructor(private httpClient: HttpClient) { }

  public getStudentPoDepartmanu(departman: number): Observable<any> {
    return this.httpClient.get(`${StudentDepartman_URL}/${departman}`);
  }

  public addStudent(student: Student): Observable<any> {
      student.id = 0;
      return this.httpClient.post(`${Student_URL}`, student);
  }

  public updateStudent(student: Student): Observable<any> {
      return this.httpClient.put(`${Student_URL}`, student);
  }

  public deleteStudent(id: number): Observable<any> {
      return this.httpClient.delete(`${Student_URL}/${id}`);
  }
}