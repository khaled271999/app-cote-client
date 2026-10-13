import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { Events } from './events';

describe('Events', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Events],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter events with the q input', async () => {
    fixture.componentRef.setInput('q', 'hack');
    await fixture.whenStable();
    const titles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.card-title'),
    ).map((el) => el.textContent?.trim());
    expect(titles).toEqual(['hackathon']);
  });
});
