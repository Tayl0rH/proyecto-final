import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule,  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private userService: UserService,
              private route: Router
  ){}

  email: string = '';
  password: string ='';

  loginUser(){
    this.userService.login(this.email, this.password).subscribe(
      users => {
        if (users.length > 0 ) {

          const user = users[0];

          localStorage.setItem('currentUser', JSON.stringify(user));

          if(user.role){
            this.route.navigate(['/admin']);
          } else {
            this.route.navigate(['/menu'])
          }

        } else {
          console.log('Credenciales incorrectas')
        }
      }
    )
  }
}
