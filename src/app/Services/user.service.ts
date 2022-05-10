import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlString: string = 'http://cg-ars.azurewebsites.net/user/authorize';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.get(urlString, {
      params: { UserName: userName, Password: password },
      responseType: 'json',
    });
  }
}
