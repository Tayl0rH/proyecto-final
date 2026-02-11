import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IDish } from '../interfaces/i-dish';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  private dishesEndPoint = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.dishesEndPoint);
  }
  deleteDishes(id: string): Observable<any> {
    return this.http.delete<IDish>(`${this.dishesEndPoint}/${id}`);
  }

  addDishes(dish: IDish): Observable<IDish> {
    return this.http.post<IDish>(this.dishesEndPoint, dish).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            new Error(
              `Error crear producto. Código de servidor: ${resp.status}. Mensaje:
              ${resp.message}`,
            ),
        ),
      ),
    );
  }

  changeEnable(id: string, enabled: boolean): Observable<IDish> {
    return this.http
      .patch<IDish>(`${this.dishesEndPoint}/${id}`, { enabled })
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(() => new Error(`Error al actualizar datos`)),
        ),
      );
  }

  updateDish(id: string, dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.dishesEndPoint}/${id}`, dish);
  }

  getDishById(id: string): Observable<IDish> {
    return this.http.get<IDish>(`${this.dishesEndPoint}/${id}`);
  }
}
