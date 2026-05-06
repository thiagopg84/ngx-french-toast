import { Injectable, Type, inject, signal } from '@angular/core';
import { ToastConfig, ToastInputModel, ToastModel } from './interfaces/interfaces';
import { ToastType } from './enums/enums';
import { TOAST_CONFIG, TOASTS_CONTAINER } from './toast.tokens';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly config = inject<ToastConfig>(TOAST_CONFIG);
  private readonly overlay = inject(Overlay);
  private readonly toastsContainer = inject<Type<any>>(TOASTS_CONTAINER, { optional: true });
  private readonly _toasts = signal<ToastModel[]>([]);
  private readonly defaultDuration: number;
  private overlayRef: OverlayRef | null = null;

  /** Read-only view of active toasts — consumed by ToastsComponent. */
  readonly toasts = this._toasts.asReadonly();

  constructor() {
    this.defaultDuration = this.config?.defaultDuration ?? 7000;
  }

  success(toastInput: ToastInputModel): void {
    this.add(toastInput, ToastType.SUCCESS);
  }

  danger(toastInput: ToastInputModel): void {
    this.add(toastInput, ToastType.DANGER);
  }

  info(toastInput: ToastInputModel): void {
    this.add(toastInput, ToastType.INFO);
  }

  warning(toastInput: ToastInputModel): void {
    this.add(toastInput, ToastType.WARNING);
  }

  clearAllToasts(): void {
    this._toasts.update((toasts) => toasts.map((t) => ({ ...t, _markedForRemoval: true })));
  }

  destroyToast(toastComponent: { toast(): { _uId: string } }): void {
    const uid = toastComponent.toast()._uId;
    this._toasts.update((toasts) =>
      toasts.map((t) => (t._uId === uid ? { ...t, _markedForRemoval: true } : t))
    );
  }

  /**
   * @internal — called by ToastComponent after its exit animation completes.
   */
  remove(uid: string): void {
    this._toasts.update((toasts) => toasts.filter((t) => t._uId !== uid));
    if (this._toasts().length === 0) {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    }
  }

  private add(toastInput: ToastInputModel, type: ToastType): void {
    const toast: ToastModel = {
      ...toastInput,
      _id: toastInput._id ?? this.generateId(),
      _uId: this.generateId(),
      type,
      isVisible: true,
      duration: toastInput.duration ?? this.defaultDuration,
    };

    const limit = this.config?.limit ?? 3;

    this._toasts.update((toasts) => {
      const updated = [...toasts, toast];
      if (updated.length > limit) {
        const allPinned = updated.every((t) => t.pinned);
        const idx = allPinned ? 0 : updated.findIndex((t) => !t.pinned);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], _markedForRemoval: true };
        }
      }
      return updated;
    });

    if (!this.overlayRef?.hasAttached()) {
      this.createOverlay();
    }
  }

  private createOverlay(): void {
    if (!this.toastsContainer) return;
    this.overlayRef = this.overlay.create();
    this.overlayRef.attach(new ComponentPortal(this.toastsContainer));
  }

  private generateId(): string {
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}
