import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Rendered per request so the ?q= search query is applied server-side.
    path: 'events',
    renderMode: RenderMode.Server
  },
  {
    path: 'events/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
