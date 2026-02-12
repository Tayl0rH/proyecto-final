import { Component, signal } from '@angular/core';
import { Nav } from "./nav/nav";
import { RouterOutlet } from '@angular/router';
import { Accesibility } from "./accesibility/accesibility";

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, Accesibility],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-final');
}
