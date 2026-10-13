import { Injectable, signal } from '@angular/core';
import { EventItem } from '../models/event-item';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  readonly events = signal<EventItem[]>([
    {
      id: 1,
      title: 'workshop',
      description: 'workshop angular',
      location: 'tunis',
      date: '2026-09-30',
      price: 500,
      availablePlaces: 5,
    },
    {
      id: 2,
      title: 'hackathon',
      description: 'workshop angular',
      location: 'tunis',
      date: '2026-09-30',
      price: 500,
      availablePlaces: 5,
    },
  ]);

  getById(id: number): EventItem | undefined {
    return this.events().find((e) => e.id === id);
  }

  add(event: Omit<EventItem, 'id'>): EventItem {
    const id = Math.max(0, ...this.events().map((e) => e.id)) + 1;
    const created = { id, ...event };
    this.events.update((events) => [...events, created]);
    return created;
  }
}
