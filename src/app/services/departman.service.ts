import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departman_URL } from '../app.constants';
import { Departman } from '../models/departman';

@Injectable({
  providedIn: 'root'
})

export class DepartmanService {

  constructor(private httpClient: HttpClient) { }

  public getAllDepartmane(): Observable<any>{
    return this.httpClient.get(`${Departman_URL}`);
  }

  public addDepartman(departman: Departman): Observable<any> {
    departman.id=0;
    return this.httpClient.post(`${Departman_URL}`, departman);
  }

  public updateDepartman(departman: Departman): Observable<any> {
    return this.httpClient.put(`${Departman_URL}`, departman);
  }

  public deleteDepartman(id: number): Observable<any> {
    return this.httpClient.delete(`${Departman_URL}/${id}`);
  } 
}
