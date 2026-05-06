import { Component, inject } from '@angular/core';
import { ToastConfig } from '../../interfaces/interfaces';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from '../../french-toast.service';
import { TOAST_CONFIG } from '../../toast.tokens';
import { ToastPosition } from '../../enums/enums';

@Component({
  standalone: true,
  selector: 'french-toast',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss', '../../styles/common-styles.scss'],
  imports: [ToastComponent]
})
export class ToastsComponent {
  private readonly toastService = inject(ToastService);
  private readonly config = inject<ToastConfig>(TOAST_CONFIG);

  readonly toasts = this.toastService.toasts;

  readonly position: ToastPosition;
  readonly bottomRight = ToastPosition.BOTTOM_RIGHT;
  readonly bottomLeft = ToastPosition.BOTTOM_LEFT;
  readonly topRight = ToastPosition.TOP_RIGHT;
  readonly topLeft = ToastPosition.TOP_LEFT;
  readonly style: string;

  constructor() {
    this.position = this.config.position ?? ToastPosition.BOTTOM_RIGHT;
    this.style = this.buildStyles();
  }

  private buildStyles(): string {
    const family = `--font-family: ${this.config.font?.family ?? 'sans-serif'}`;
    const titleSize = `--title-font-size: ${this.config.font?.titleFontSize ?? '1.2rem'}`;
    const contentSize = `--content-font-size: ${this.config.font?.contentFontSize ?? '1rem'}`;
    return `${family}; ${titleSize}; ${contentSize}`;
  }
}
