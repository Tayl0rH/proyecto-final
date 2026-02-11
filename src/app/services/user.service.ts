import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/i-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userEndPoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  loadUsers(){
    return this.http.get<IUser[]>(this.userEndPoint);
  }

  login(email: string, password: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      `${this.userEndPoint}?email=${email}&password=${password}`
    )
  }
  
}
