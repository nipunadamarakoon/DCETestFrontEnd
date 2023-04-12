import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList(pageNumber: any): Observable<any> {
    return this.http.get(`https://reqres.in/api/users?page=${pageNumber}`);
  }
  InsertUser(data: any): Observable<any> {
    return this.http.post('https://reqres.in/api/users', data);
  }
  UpdateUser(data: any, id: any): Observable<any> {
    return this.http.post(`https://reqres.in/api/users/${id}`, data);
  }
  DeleteUser(id: number): Observable<any> {
    return this.http.delete(`https://reqres.in/api/users/${id}`);
  }
}
