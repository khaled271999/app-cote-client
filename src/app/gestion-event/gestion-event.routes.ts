import { Routes } from '@angular/router';
import { Events } from './events/events';
import { DetailEvent } from './detail-event/detail-event';
import { AddEvent } from './add-event/add-event';

export const EVENT_ROUTES: Routes = [
  { path: '', component: Events },
  { path: 'add', component: AddEvent },
  { path: ':id', component: DetailEvent },
];
