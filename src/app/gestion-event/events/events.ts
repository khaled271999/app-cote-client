import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event';

@Component({
  selector: 'app-events',
  imports: [DatePipe, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private readonly events = inject(EventService).events;

  /** Bound from the `?q=` query parameter (withComponentInputBinding). */
  readonly q = input<string>();

  protected readonly filteredEvents = computed(() => {
    const term = (this.q() ?? '').trim().toLowerCase();
    if (!term) {
      return this.events();
    }
    return this.events().filter((e) =>
      [e.title, e.description, e.location].some((field) => field.toLowerCase().includes(term)),
    );
  });
}
