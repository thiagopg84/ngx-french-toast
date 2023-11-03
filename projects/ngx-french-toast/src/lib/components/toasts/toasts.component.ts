
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { delay, filter, startWith, Subject, takeUntil } from 'rxjs';
import { ToastModel } from '../../interfaces/interfaces';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from '../../french-toast.service';
import { TOAST_CONFIG } from '../../toast.tokens';
import { ToastConfig } from '../../interfaces/interfaces';
import { ToastPosition } from '../../enums/enums';

@Component({
  selector: 'french-toast',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss', '../../styles/common-styles.scss'],
})
export class ToastsComponent implements OnInit, AfterViewInit, OnDestroy {
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
  private destroy$ = new Subject<void>();

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.toastsComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(''),
        delay(0)
      )
      .subscribe({
        next: () => {
          const reachedLimit = this.toastsComponents.toArray().length > (this.config.limit || 3);
          if (reachedLimit) {
            this.toastsComponents.toArray()[0].destroyToast();
          }
        },
      });
  }

  getStyles(): string {
    this.fontFamily = `--font-family: ${this.config.font?.family || 'sans-serif'}`;
    this.titleFontSize = `--title-font-size: ${this.config.font?.titleFontSize || '1.2rem'}`;
    this.contentFontSize = `--content-font-size: ${this.config.font?.contentFontSize || '1rem'}`;
    return `${this.fontFamily}; ${this.titleFontSize}; ${this.contentFontSize}`;
  }

  getToasts(): void {
    this.toastService.toast
      .pipe(
        takeUntil(this.destroy$),
        filter((toast) => !!toast)
      )
      .subscribe({
        next: (toast) => {
          const toastElement: ToastModel = toast as ToastModel;
          const pinnedToastOnScreen = this.toasts.some((tst) => tst?.pinned);
          if (pinnedToastOnScreen && !toast?.pinned) {
            const firstPinnedToastIndex = this.toasts.indexOf(
              this.toasts.find((e) => e.pinned) as ToastModel
            );
            this.toasts.splice(firstPinnedToastIndex, 0, toastElement);
            return;
          }
          this.toasts.push(toast as ToastModel);
        },
      });

    this.toastService.clearAll
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.toastsComponents.toArray().forEach((e) => {
              e.destroyToast();
            });
          }
        },
      });
  }

  control(toast: ToastModel): void {
    const index = this.toasts.indexOf(toast);
    this.toasts.splice(index, 1);
  }
}
