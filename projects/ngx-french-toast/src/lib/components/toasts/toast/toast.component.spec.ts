import { afterEach, describe, expect, it, vi } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../../french-toast.service';
import { TOAST_CONFIG } from '../../../toast.tokens';
import { ToastModel } from '../../../interfaces/interfaces';

function makeToast(overrides: Partial<ToastModel> = {}): ToastModel {
  return {
    _id: 'id-1',
    _uId: 'uid-1',
    title: 'Hello',
    type: 'success',
    isVisible: true,
    duration: 5000,
    ...overrides
  };
}

const mockToastService = { remove: vi.fn() };

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;

  function setup(toast: ToastModel = makeToast(), config: object = {}) {
    TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ToastService, useValue: mockToastService },
        { provide: TOAST_CONFIG, useValue: config }
      ]
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('toast', toast);
    fixture.detectChanges();
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('calls toastService.remove() after dismiss()', () => {
    vi.useFakeTimers();
    setup();
    component.isVisible.set(true);
    component.dismiss();
    expect(component.isVisible()).toBe(false);
    vi.advanceTimersByTime(100);
    expect(mockToastService.remove).toHaveBeenCalledWith('uid-1');
  });

  it('does not call remove() twice if dismiss() is called again', () => {
    vi.useFakeTimers();
    setup();
    component.isVisible.set(true);
    component.dismiss();
    component.dismiss();
    vi.advanceTimersByTime(100);
    expect(mockToastService.remove).toHaveBeenCalledTimes(1);
  });

  it('auto-destroys after the toast duration', () => {
    vi.useFakeTimers();
    setup(makeToast({ duration: 3000 }));
    vi.advanceTimersByTime(3000);
    vi.advanceTimersByTime(100);
    expect(mockToastService.remove).toHaveBeenCalledWith('uid-1');
  });

  it('does not auto-destroy when infinite is true', () => {
    vi.useFakeTimers();
    setup(makeToast({ infinite: true }));
    vi.advanceTimersByTime(60_000);
    expect(mockToastService.remove).not.toHaveBeenCalled();
  });

  it('onMouseEnter() pauses the timer', () => {
    vi.useFakeTimers();
    setup(makeToast({ duration: 3000 }));
    vi.advanceTimersByTime(1000);
    component.onMouseEnter();
    vi.advanceTimersByTime(5000);
    expect(mockToastService.remove).not.toHaveBeenCalled();
  });

  it('onMouseLeave() resumes the timer after pause', () => {
    vi.useFakeTimers();
    setup(makeToast({ duration: 3000 }));
    vi.advanceTimersByTime(1000);
    component.onMouseEnter();
    vi.advanceTimersByTime(500);
    component.onMouseLeave();
    vi.advanceTimersByTime(2000);
    vi.advanceTimersByTime(100);
    expect(mockToastService.remove).toHaveBeenCalledWith('uid-1');
  });

  it('detects SVG sprite icons correctly', () => {
    setup(makeToast({ icon: '/icons/sprite.svg#check' }));
    expect(component.svgUrlIsFromSprite).toBe(true);
  });

  it('detects regular image icons correctly', () => {
    setup(makeToast({ icon: '/icons/check.png' }));
    expect(component.svgUrlIsFromSprite).toBe(false);
  });

  it('applies a custom background color from config', () => {
    setup(makeToast(), { colors: { success: '#00ff00' } });
    expect(component.style).toContain('#00ff00');
  });

  it('defaults text color to #ffffff when not configured', () => {
    setup(makeToast());
    expect(component.textColor).toBe('#ffffff');
  });

  it('clears the timeout on component destroy', () => {
    vi.useFakeTimers();
    setup(makeToast({ duration: 5000 }));
    fixture.destroy();
    vi.advanceTimersByTime(5100);
    expect(mockToastService.remove).not.toHaveBeenCalled();
  });
});
