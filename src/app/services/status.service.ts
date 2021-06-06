import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { Injectable } from '@angular/core';
import { Status_URL } from '../app.constants';

@Injectable({
    providedIn: 'root'
})

export class StatusService {

    constructor(public httpClient: HttpClient) { }

    public getAllStatuse(): Observable<any> {
    return this.httpClient.get(`${Status_URL}`);
    }
    public addStatus(status: Status): Observable<any> {
        status.id=0;
        return this.httpClient.post(`${Status_URL}`,status);
    }
    public updateStatus(status: Status): Observable<any> {
        return this.httpClient.put(`${Status_URL}`,status);
    }
    public deleteStatus(id: number): Observable<any> {
        return this.httpClient.delete(`${Status_URL}/${id}`);
    } 
}