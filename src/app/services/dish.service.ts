import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IDish } from '../interfaces/i-dishes';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  private dishesEndPoint = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) { }

  getDishes(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.dishesEndPoint);
  }
  deleteDishes(id: string): Observable<any> {
    return this.http.delete<IDish>(`${this.dishesEndPoint}/${id}`);
  }
  // editar y habilitar-deshabilitar

  addDishes(dish: IDish): Observable<IDish> {
    return this.http
      .post<IDish>(this.dishesEndPoint, dish)
      .pipe(
        catchError((resp : HttpErrorResponse) =>
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
  }


