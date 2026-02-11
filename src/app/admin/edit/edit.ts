import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishesService } from '../../services/dish.service';
import { IDish } from '../../interfaces/i-dish';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  dish: IDish = {
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    enabled: true,
  };
  constructor(
    private dishesService: DishesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.dishesService.getDishById(id).subscribe({
        next: (dishFound) => {
          this.dish = dishFound;
        },
        error: (error) => console.log(error),
      });
    }
  }

  // Dentro de la clase Edit en edit.ts

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // Actualizamos la imagen del plato que estamos editando
          this.dish.image = canvas.toDataURL('image/jpeg', 0.7);
          console.log('Imagen de edición comprimida');
        }
      };
    };
    reader.readAsDataURL(file);
  }

  editDish(dish: IDish) {
    this.dishesService.updateDish(dish.id!, dish).subscribe({
      next: () => {
        this.router.navigate(['/admin']); // Redirigir al listado
      },
      error: (err) => console.error('Error al actualizar:', err),
    });
  }
}
