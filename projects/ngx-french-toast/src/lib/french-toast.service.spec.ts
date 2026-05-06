import { afterEach, describe, expect, it, vi } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastService } from './french-toast.service';
import { TOAST_CONFIG } from './toast.tokens';
import { ToastComponent } from './components/toasts/toast/toast.component';

function setup(config: object = {}) {
  TestBed.configureTestingModule({
    imports: [OverlayModule],
    providers: [
      provideZonelessChangeDetection(),
      { provide: TOAST_CONFIG, useValue: config }
    ]
  });
  const service = TestBed.inject(ToastService);
  vi.spyOn(service as any, 'createOverlay').mockImplementation(() => {});
  return service;
}

describe('ToastService', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('should be created', () => {
    expect(setup()).toBeTruthy();
  });

  it('success() adds a toast with type "success"', () => {
    const service = setup();
    service.success({ title: 'Done' });
    expect(service.toasts()[0].type).toBe('success');
    expect(service.toasts()[0].title).toBe('Done');
  });

  it('danger() adds a toast with type "danger"', () => {
    const service = setup();
    service.danger({ title: 'Error' });
    expect(service.toasts()[0].type).toBe('danger');
  });

  it('info() adds a toast with type "info"', () => {
    const service = setup();
    service.info({ title: 'Info' });
    expect(service.toasts()[0].type).toBe('info');
  });

  it('warning() adds a toast with type "warning"', () => {
    const service = setup();
    service.warning({ title: 'Warning' });
    expect(service.toasts()[0].type).toBe('warning');
  });

  it('applies the default 7000ms duration when not specified', () => {
    const service = setup();
    service.success({ title: 'No duration' });
    expect(service.toasts()[0].duration).toBe(7000);
  });

  it('uses defaultDuration from config', () => {
    const service = setup({ defaultDuration: 3000 });
    service.success({ title: 'Config duration' });
    expect(service.toasts()[0].duration).toBe(3000);
  });

  it('input duration overrides the default', () => {
    const service = setup();
    service.success({ title: 'Short', duration: 1500 });
    expect(service.toasts()[0].duration).toBe(1500);
  });

  it('auto-generates _id when not provided', () => {
    const service = setup();
    service.success({ title: 'Auto ID' });
    expect(service.toasts()[0]._id).toBeTruthy();
  });

  it('preserves a provided _id', () => {
    const service = setup();
    service.success({ title: 'Custom ID', _id: 'my-id' });
    expect(service.toasts()[0]._id).toBe('my-id');
  });

  it('enforces the limit by marking the oldest toast for removal', () => {
    const service = setup({ limit: 2 });
    service.success({ title: 'A' });
    service.success({ title: 'B' });
    service.success({ title: 'C' });
    const toasts = service.toasts();
    expect(toasts.length).toBe(3);
    expect(toasts[0]._markedForRemoval).toBe(true);
    expect(toasts[1]._markedForRemoval).toBeFalsy();
    expect(toasts[2]._markedForRemoval).toBeFalsy();
  });

  it('clearAllToasts() marks all toasts for removal', () => {
    const service = setup();
    service.success({ title: 'A' });
    service.success({ title: 'B' });
    service.clearAllToasts();
    expect(service.toasts().every((t) => t._markedForRemoval)).toBe(true);
  });

  it('destroyToast() marks the specific toast for removal', () => {
    const service = setup();
    service.success({ title: 'A' });
    service.success({ title: 'B' });
    const uid = service.toasts()[0]._uId;
    const mockComponent = { toast: () => ({ _uId: uid }) } as unknown as ToastComponent;
    service.destroyToast(mockComponent);
    expect(service.toasts()[0]._markedForRemoval).toBe(true);
    expect(service.toasts()[1]._markedForRemoval).toBeFalsy();
  });

  it('remove() eliminates the toast from the signal', () => {
    const service = setup();
    service.success({ title: 'A' });
    const uid = service.toasts()[0]._uId;
    service.remove(uid);
    expect(service.toasts().length).toBe(0);
  });
});
