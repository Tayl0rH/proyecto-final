import { Component, Input } from '@angular/core';
import { DishesService } from '../services/dish.service';
import { Observable } from 'rxjs';
import { IDish } from '../interfaces/i-dish';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  dishes$: Observable<IDish[]>;

  constructor(private dishesService: DishesService,
              private userService: UserService,
              private router: Router
  ) {
    this.dishes$ = this.dishesService.getDishes();
  }

  ngOnInit(): void {
    const user = this.userService.currentUser();

    if(user?.role === 'chef'){
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/menu'])
    }
  }

  newDish: IDish = {
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    enabled: true,
  };

  /*
   He cambiado el changeImage que teníamos en las practicas anteriores
   por este, que me deja usbir archivos más pesados porque, si no,
   no funcionaba.
  */
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        // Creamos un Canvas para redimensionar la imagen
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Tamaño pequeño para que json-server no explote
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convertimos a Base64 pero con calidad reducida (0.7)
          // Esto genera un string mucho más corto
          this.newDish.image = canvas.toDataURL('image/jpeg', 0.7);
          console.log('Imagen comprimida con éxito');
        }
      };
    };
    reader.readAsDataURL(file);
  }

  addDishes() {
    this.dishesService.addDishes(this.newDish).subscribe({
      next: (response) => {
        //this.dishes$ = this.dishesService.getDishes();
        this.newDish = {
          name: '',
          description: '',
          price: 0,
          category: '',
          image: '',
          enabled: true,
        };
      },
      error: (error) => {
        alert('No se pudo añadir el plato.');
        console.log(error);
      },
    });
    this.dishes$ = this.dishesService.getDishes();

  }

  deleteDish(id: string) {
    this.dishesService.deleteDishes(id).subscribe({
      /*next: (response) => {
        this.dishes$ = this.dishesService.getDishes();
      }, */
      error: (error) => {
        alert('No se pudo eliminar el plato.');
        console.log(error);
      },
    });
    this.dishes$ = this.dishesService.getDishes();

  }

  showDish(id: string, enabled: boolean) {
    this.dishesService.changeEnable(id, !enabled).subscribe({
      next: (response) => {
        this.dishes$ = this.dishesService.getDishes();
      },
      error: (error) => {
        alert('No se pudo cambiar el estado del plato.');
        console.log(error);
      },
    });
  }
}
