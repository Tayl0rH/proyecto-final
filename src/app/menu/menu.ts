import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DishesService } from '../services/dish.service';
import { CommonModule } from '@angular/common';
import { IDish } from '../interfaces/i-dish';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  dishes$: Observable<IDish[]>;
  private orderBy = true;

  constructor(private dishesService: DishesService) {
    this.dishes$ = this.dishesService
      .getDishes()
      .pipe(map((dishes) => dishes.filter((dish) => dish.enabled)));
  }

  orderPrice() {
    this.orderBy = !this.orderBy;

    this.dishes$ = this.dishes$.pipe(
      map((dishes) => {
        return [...dishes].sort((a, b) => {
          return this.orderBy ? a.price - b.price : b.price - a.price;
        });
      }),
    );
  }

  orderCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    const categorySelected = select.value;

    this.dishes$ = this.dishesService.getDishes().pipe(
      map((dishes) => {
        const enabledDishes = dishes.filter((d) => d.enabled);

        if (!categorySelected) {
          return enabledDishes;
        }

        return enabledDishes.filter((dish) => dish.category === categorySelected);
      }),
    );
  }
}
