import { Component, ComponentRef, DestroyRef, inject, OnInit, signal, viewChildren } from '@angular/core';
import { filter } from 'rxjs';
import { ToastModel } from '../../interfaces/interfaces';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from '../../french-toast.service';
import { TOAST_CONFIG } from '../../toast.tokens';
import { ToastConfig } from '../../interfaces/interfaces';
import { ToastPosition } from '../../enums/enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'french-toast',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss', '../../styles/common-styles.scss'],
  imports: [ToastComponent]
})
export class ToastsComponent implements OnInit {
  private toastService = inject(ToastService);
  private config = inject<ToastConfig>(TOAST_CONFIG);
  private destroyRef = inject(DestroyRef);
  readonly toastsComponents = viewChildren(ToastComponent);
  toasts = signal<ToastModel[]>([]);
  position: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomRight: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomLeft: ToastPosition = ToastPosition.BOTTOM_LEFT;
  topRight: ToastPosition = ToastPosition.TOP_RIGHT;
  topLeft: ToastPosition = ToastPosition.TOP_LEFT;
  fontFamily: string = '';
  titleFontSize: string = '';
  contentFontSize: string = '';
  style: string = '';
  componentRef!: ComponentRef<ToastsComponent>;

  constructor() {
    if (this.config.position) this.position = this.config.position;
  }

  ngOnInit(): void {
    this.getToasts();
    this.style = this.getStyles();
  }

  getStyles(): string {
    this.fontFamily = `--font-family: ${this.config.font?.family || 'sans-serif'}`;
    this.titleFontSize = `--title-font-size: ${this.config.font?.titleFontSize || '1.2rem'}`;
    this.contentFontSize = `--content-font-size: ${this.config.font?.contentFontSize || '1rem'}`;
    return `${this.fontFamily}; ${this.titleFontSize}; ${this.contentFontSize}`;
  }

  getToasts(): void {
    this.listenForToasts();
    this.listenForDestroyAllToasts();
    this.listenForDestroyToast();
  }

  listenForToasts(): void {
    this.toastService.toast
      .pipe(
        filter((toast) => !!toast),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (toast) => {
          const toastElement: ToastModel = { ...toast } as ToastModel;
          const currentToasts = this.toasts();
          const limit = this.config.limit || 3;
          const updatedToasts = [...currentToasts, toastElement];
          this.toasts.set(updatedToasts);

          if (updatedToasts.length > limit) {
            setTimeout(() => {
              const allToastsArePinned = currentToasts.every((t) => t.pinned);
              const toastToRemove = allToastsArePinned ? updatedToasts[0] : updatedToasts.find((t) => !t.pinned);
              if (toastToRemove) {
                this.toastsComponents()
                  .find((comp) => comp.toast()._uId === toastToRemove._uId)
                  ?.destroyToast();
              }
            }, 100);
          }
        }
      });
  }

  listenForDestroyAllToasts(): void {
    this.toastService.clearAll.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        const toastsComponents = this.toastsComponents();
        if (!toastsComponents) return;
        toastsComponents.forEach((e) => {
          e.destroyToast();
        });
      }
    });
  }

  listenForDestroyToast(): void {
    this.toastService.clearToast.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (uniqueId: string) => {
        this.toastsComponents()
          .find((toast) => toast.toast()._uId === uniqueId)
          ?.destroyToast();
      }
    });
  }

  control(toast: ToastModel): void {
    const toasts = this.toasts();
    const index = toasts.indexOf(toast);
    toasts[index].isVisible = false;
    toasts.splice(index, 1);
    this.toasts.set(toasts);
    if (this.toasts().length === 0) {
      this.componentRef.destroy();
    }
  }
}
