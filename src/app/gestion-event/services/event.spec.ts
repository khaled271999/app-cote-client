import { TestBed } from '@angular/core/testing';

import { EventService } from './event';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find an event by id', () => {
    expect(service.getById(2)?.title).toBe('hackathon');
    expect(service.getById(99)).toBeUndefined();
  });
});
