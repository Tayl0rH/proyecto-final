import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/edit/:id',
    renderMode: RenderMode.Client, // Esto evita que el build busque los IDs
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
