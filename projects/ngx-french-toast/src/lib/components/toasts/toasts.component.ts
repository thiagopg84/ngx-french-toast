
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { delay, filter, startWith, Subscription } from 'rxjs';
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
  subs!: Subscription;
  position: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomRight: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomLeft: ToastPosition = ToastPosition.BOTTOM_LEFT;
  topRight: ToastPosition = ToastPosition.TOP_RIGHT;
  topLeft: ToastPosition = ToastPosition.TOP_LEFT;

  constructor(
    private toastService: ToastService,
    @Inject(TOAST_CONFIG) private config: ToastConfig
  ) {
    if (this.config.position) {
      this.position = this.config.position;
    }
  }

  ngOnInit(): void {
    this.getToasts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subs = this.toastsComponents.changes
      .pipe(startWith(''))
      .pipe(delay(0))
      .subscribe({
        next: () => {
          const reachedLimit = this.toastsComponents.toArray().length > (this.config.limit || 3);
          if (reachedLimit) {
            this.toastsComponents.toArray()[0].destroyToast();
          }
        },
      });
  }

  getToasts(): void {
    this.subs = this.toastService.toast
      .pipe(filter((toast) => !!toast))
      .subscribe({
        next: (toast) => {
          const toastElement: ToastModel = toast as ToastModel;
          if (this.toasts.some((tst) => tst?.component) && !toast?.component) {
            const index = this.toasts.indexOf(
              this.toasts.find((e) => e.component) as ToastModel
            );
            this.toasts.splice(index, 0, toastElement);
            return;
          }
          this.toasts.push(toast as ToastModel);
        },
      });

    this.subs = this.toastService.clearAll.subscribe({
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
