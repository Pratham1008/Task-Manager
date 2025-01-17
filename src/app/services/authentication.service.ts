import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from 'ngx-cookie-service';
import Users from "./Users";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private url : string = 'https://taskmanagerserver-cxa9.onrender.com/api/auth';

  private http = inject(HttpClient);
  private cookie = inject(CookieService);

  register(user : Users) : Observable<Users>{
    return this.http.post<Users>(`${this.url}/register`, {user}, {
      withCredentials: true,
    });
  }

  login(email : any, password : any) : Observable<any> {
    return this.http.post<any>(`${this.url}/login`, {email, password}, {
      withCredentials: true
    });
  }

  getUser(username : string): Observable<any> {
    return this.http.get(`${this.url}/user/${username}`, {withCredentials: true});
  }

  checkCookie() {
    return this.cookie.check('token');
  }

  setCookie(token : string){
    this.cookie.set('token', token, {
      expires : 1,
      path: "/",
      secure: true
    });
  }

  getCookie(){
    return this.cookie.get('token');
  }

  deleteCookie(){
    this.cookie.delete('token');
  }
}
