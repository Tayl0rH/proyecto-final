import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DishesService } from '../services/dish.service';
import { CommonModule } from '@angular/common';
import { IDish } from '../interfaces/i-dishes';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  dishes$: Observable<IDish[]>;

  constructor(private dishesService: DishesService){
    this.dishes$ = this.dishesService.getDishes().pipe(
      map(dishes => dishes.filter(dish=> dish.enabled === true))
    );
  }

}
