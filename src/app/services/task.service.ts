import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Tasks from "./Tasks";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url : string = 'https://taskmanagerserver.up.railway.app/api';
  private service = inject(AuthenticationService);
  private http = inject(HttpClient);


  addTask(task : Tasks) : Observable<Tasks> {
    const token = this.service.getCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Tasks>(`${this.url}/tasks`, task, {
      withCredentials: true,
      headers
    });
  }

  getTask() : Observable<Tasks[]> {
    const token = this.service.getCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tasks[]>(`${this.url}/tasks`, {
      withCredentials: true,
      headers
    });
  }

  getById(id : string): Observable<Tasks> {
    const token = this.service.getCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tasks>(`${this.url}/tasks/${id}`, {
      withCredentials: true,
      headers
    });
  }

  editTask(id : string, task: Tasks) : Observable<Tasks> {
    const token = this.service.getCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Tasks>(`${this.url}/tasks/${id}`, task, {
      withCredentials: true,
      headers
    });
  }

  toggle(id: string,task: Tasks) : Observable<Tasks> {
    const token = this.service.getCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Tasks>(`${this.url}/tasks/status/${id}`, task, {
      withCredentials: true,
      headers
    });
  }

  deleteTask(id : string) : Observable<void> {
    const token = this.service.getCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.url}/tasks/${id}`, {
      withCredentials: true,
      headers
    });
  }
}
