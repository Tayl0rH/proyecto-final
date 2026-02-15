import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { Admin } from './admin/admin';
import { Login } from './login/login';
import { Edit } from './admin/edit/edit';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    title: 'Inicio',
  },
  {
    path: 'menu',
    component: Menu,
    title: 'Menu',
  },
  {
    path: 'admin',
    component: Admin,
    title: 'Admin',
  },
  {
    path: 'admin/edit/:id',
    component: Edit,
    title: 'Gestión de Menú',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
