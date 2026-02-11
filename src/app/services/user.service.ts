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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void{
    localStorage.removeItem('currentUser');
  }

  currentUser(): IUser | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isChef(): boolean {
    const user = this.currentUser();
    return user?.role === 'chef';
  }
}
