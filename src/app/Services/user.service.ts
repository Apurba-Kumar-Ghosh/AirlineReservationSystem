import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlString: string = 'http://localhost:28217/api/Users/login';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<Object> {
    return this.http.get(urlString, {
      params: { user: userName, pw: password },
      responseType: 'text',
    });
  }
}
