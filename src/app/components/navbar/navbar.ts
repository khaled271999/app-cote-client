import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly router = inject(Router);

  search(event: SubmitEvent, term: string): void {
    event.preventDefault();
    const q = term.trim();
    this.router.navigate(['/events'], { queryParams: q ? { q } : {} });
  }
}
