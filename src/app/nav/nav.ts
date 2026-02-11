import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  constructor(private userService: UserService,
              private router: Router
  ){}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    console.log(this.isChef());
  }

  isChef() {
    return this.userService.isChef() ;
  }

  isLogged(){
    return this.userService.isLoggedIn();
  }

  logout(){
    this.router.navigate(['/']);
    return this.userService.logout();
  }
}
