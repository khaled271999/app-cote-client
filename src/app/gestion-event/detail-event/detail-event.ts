import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event';

@Component({
  selector: 'app-detail-event',
  imports: [DatePipe, RouterLink],
  templateUrl: './detail-event.html',
  styleUrl: './detail-event.css',
})
export class DetailEvent {
  private readonly eventService = inject(EventService);

  /** Bound from the `:id` route parameter (withComponentInputBinding). */
  readonly id = input<string>();

  protected readonly event = computed(() => this.eventService.getById(Number(this.id())));
}
