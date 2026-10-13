import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  protected readonly products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 1200, quantity: 5, likes: 0 },
    { id: 2, name: 'Phone', price: 800, quantity: 10, likes: 0 },
    { id: 3, name: 'Headphones', price: 150, quantity: 3, likes: 0 },
  ]);

  like(id: number): void {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    );
  }

  buy(id: number): void {
    this.products.update((list) =>
      list.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p,
      ),
    );
  }
}
