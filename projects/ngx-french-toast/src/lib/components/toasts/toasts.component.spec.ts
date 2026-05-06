import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastsComponent } from './toasts.component';
import { ToastService } from '../../french-toast.service';
import { TOAST_CONFIG } from '../../toast.tokens';
import { ToastModel } from '../../interfaces/interfaces';

function makeToast(overrides: Partial<ToastModel> = {}): ToastModel {
  return {
    _id: 'id-1',
    _uId: 'uid-1',
    title: 'Test',
    type: 'success',
    isVisible: true,
    duration: 5000,
    ...overrides
  };
}

class MockToastService {
  private _toasts = signal<ToastModel[]>([]);
  readonly toasts = this._toasts.asReadonly();

  setToasts(toasts: ToastModel[]) { this._toasts.set(toasts); }
  remove = vi.fn((uid: string) => {
    this._toasts.update((t) => t.filter((x) => x._uId !== uid));
  });
}

describe('ToastsComponent', () => {
  let fixture: ComponentFixture<ToastsComponent>;
  let component: ToastsComponent;
  let mockService: MockToastService;

  beforeEach(async () => {
    mockService = new MockToastService();

    await TestBed.configureTestingModule({
      imports: [ToastsComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ToastService, useValue: mockService },
        { provide: TOAST_CONFIG, useValue: { limit: 3 } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('reflects toasts from the service signal', () => {
    mockService.setToasts([makeToast()]);
    expect(component.toasts().length).toBe(1);
    expect(component.toasts()[0].title).toBe('Test');
  });

  it('reflects multiple toasts from the service signal', () => {
    mockService.setToasts([makeToast({ _uId: 'a' }), makeToast({ _uId: 'b' })]);
    expect(component.toasts().length).toBe(2);
  });

  it('buildStyles() generates CSS variable string from config', () => {
    const style = (component as any).buildStyles();
    expect(style).toContain('--font-family');
    expect(style).toContain('--title-font-size');
    expect(style).toContain('--content-font-size');
  });
});
