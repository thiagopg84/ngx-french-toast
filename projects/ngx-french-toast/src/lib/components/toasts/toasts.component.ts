import {
  AfterViewInit,
  Component,
  ComponentRef,
  DestroyRef,
  inject,
  Inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { delay, filter, startWith } from 'rxjs';
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
export class ToastsComponent implements OnInit, AfterViewInit {
  toasts: ToastModel[] = [];
  @ViewChildren(ToastComponent) toastsComponents!: QueryList<ToastComponent>;
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
  private destroyRef = inject(DestroyRef);

  constructor(
    private toastService: ToastService,
    @Inject(TOAST_CONFIG) private config: ToastConfig
  ) {
    if (this.config.position) this.position = this.config.position;
  }

  ngOnInit(): void {
    this.getToasts();
    this.style = this.getStyles();
  }

  ngAfterViewInit(): void {
    this.toastsComponents.changes.pipe(startWith(''), delay(0), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        const reachedLimit = this.toastsComponents.toArray().length > (this.config.limit || 3);
        if (reachedLimit) {
          this.toastsComponents.toArray()[0].destroyToast();
        }
      }
    });
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
          const toastElement: ToastModel = toast as ToastModel;
          const pinnedToastOnScreen = this.toasts.some((tst) => tst?.pinned);
          if (pinnedToastOnScreen && !toast?.pinned) {
            const firstPinnedToastIndex = this.toasts.indexOf(this.toasts.find((e) => e.pinned) as ToastModel);
            this.toasts.splice(firstPinnedToastIndex, 0, toastElement);
            return;
          }
          this.toasts.push(toast as ToastModel);
        }
      });
  }

  listenForDestroyAllToasts(): void {
    this.toastService.clearAll.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (!this.toastsComponents) return;
        this.toastsComponents.toArray().forEach((e) => {
          e.destroyToast();
        });
      }
    });
  }

  listenForDestroyToast(): void {
    this.toastService.clearToast.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (uniqueId: string) => {
        this.toastsComponents
          .toArray()
          .find((toast) => toast.toast._uId === uniqueId)
          ?.destroyToast();
      }
    });
  }

  control(toast: ToastModel): void {
    const index = this.toasts.indexOf(toast);
    this.toasts.splice(index, 1);
    if (this.toasts.length === 0) {
      this.componentRef.destroy();
    }
  }
}
