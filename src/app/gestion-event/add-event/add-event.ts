import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../services/event';

/** Rejects dates before today (compares `yyyy-MM-dd` strings, local time). */
function notInPast(control: AbstractControl<string>): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  return control.value < today ? { pastDate: true } : null;
}

/** Rejects values made only of spaces. */
function notBlank(control: AbstractControl<string>): ValidationErrors | null {
  return control.value && !control.value.trim() ? { blank: true } : null;
}

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-event.html',
  styleUrl: './add-event.css',
})
export class AddEvent {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    title: this.fb.nonNullable.control('', [
      Validators.required,
      notBlank,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: this.fb.nonNullable.control('', [
      Validators.required,
      notBlank,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
    location: this.fb.nonNullable.control('', [
      Validators.required,
      notBlank,
      Validators.minLength(2),
    ]),
    date: this.fb.nonNullable.control('', [Validators.required, notInPast]),
    price: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    availablePlaces: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/),
    ]),
  });

  /** True once the user has interacted with an invalid field. */
  protected isInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.eventService.add({
      title: value.title.trim(),
      description: value.description.trim(),
      location: value.location.trim(),
      date: value.date,
      price: value.price!,
      availablePlaces: value.availablePlaces!,
    });
    this.router.navigate(['/events']);
  }
}
