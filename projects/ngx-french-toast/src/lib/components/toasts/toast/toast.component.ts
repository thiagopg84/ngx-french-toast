import {
  AfterViewInit,
  Component,
  ComponentRef,
  effect,
  HostListener,
  OnDestroy,
  OnInit,
  untracked,
  ViewContainerRef,
  input,
  viewChild,
  inject,
  signal
} from '@angular/core';
import { ToastConfig, ToastModel } from '../../../interfaces/interfaces';
import { TOAST_CONFIG } from '../../../toast.tokens';
import { ToastPosition } from '../../../enums/enums';
import { ToastService } from '../../../french-toast.service';
import { darkenHexColor } from '../../../utils/utils';
import { NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss', '../../../styles/common-styles.scss'],
  imports: [NgStyle]
})
export class ToastComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly config = inject<ToastConfig>(TOAST_CONFIG);
  private readonly toastService = inject(ToastService);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  readonly container = viewChild.required('container', { read: ViewContainerRef });
  readonly toast = input.required<ToastModel>();

  isVisible = signal(false);
  duration!: number;
  private remainingTime!: number;
  timeout: ReturnType<typeof setTimeout> | undefined;
  private resumeTime!: Date;
  private componentRef: ComponentRef<any> | undefined;
  svgUrlIsFromSprite = false;
  readonly position: ToastPosition;
  readonly bottomRight = ToastPosition.BOTTOM_RIGHT;
  readonly bottomLeft = ToastPosition.BOTTOM_LEFT;
  readonly topRight = ToastPosition.TOP_RIGHT;
  readonly topLeft = ToastPosition.TOP_LEFT;
  timebarColor: { background: string } | undefined;
  textColor = '';
  style = '';

  constructor() {
    this.position = this.config.position ?? ToastPosition.BOTTOM_RIGHT;

    effect(() => {
      if (this.toast()._markedForRemoval) {
        untracked(() => this.dismiss());
      }
    });
  }

  ngOnInit(): void {
    this.getColors();
    const toast = this.toast();
    this.svgUrlIsFromSprite = !!toast.icon?.includes('.svg#');
    if (toast.infinite) return;
    this.duration = Number(toast.duration);
    this.remainingTime = this.duration;
    this.resumeTime = new Date();
    this.timeout = setTimeout(() => this.dismiss(), this.duration);
  }

  ngAfterViewInit(): void {
    if (this.toast().component) {
      this.createDynamicToast();
    }
    requestAnimationFrame(() => {
      this.isVisible.set(true);
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  dismiss(): void {
    if (!this.isVisible()) return;
    clearTimeout(this.timeout);
    this.isVisible.set(false);
    setTimeout(() => {
      this.toastService.remove(this.toast()._uId);
    }, 100);
  }

  onMouseEnter(): void {
    if (this.toast().infinite) return;
    clearTimeout(this.timeout);
    this.remainingTime -= new Date().getTime() - this.resumeTime.getTime();
  }

  onMouseLeave(): void {
    if (this.toast().infinite) return;
    this.resumeTime = new Date();
    this.timeout = setTimeout(() => this.dismiss(), this.remainingTime);
  }

  private createDynamicToast(): void {
    this.container().clear();
    this.componentRef = this.container().createComponent(this.toast().component!);
    this.componentRef.instance.content = this.toast().content;
    if (this.toast().context) {
      this.componentRef.instance.context = this.toast().context;
    }
  }

  private getColors(): void {
    this.getToastStyle();
    this.getTimebarColor();
  }

  private getToastStyle(): void {
    this.textColor = this.getToastTextColor();
    this.style = `--text-color: ${this.textColor};`;
    const colorHexCode = this.config?.colors?.[this.toast().type] as string;
    if (!colorHexCode) return;
    const darkened = darkenHexColor(colorHexCode, 0.725);
    const linearGradient = this.config.colors?.autoGradient
      ? `linear-gradient(45deg, ${darkened}, ${colorHexCode})`
      : colorHexCode;
    this.style += `background: ${linearGradient}`;
  }

  private getToastTextColor(): string {
    const key = (this.toast().type + 'Text') as 'successText' | 'dangerText' | 'infoText' | 'warningText';
    return this.config.colors?.[key] ?? '#ffffff';
  }

  private getTimebarColor(): void {
    if (!this.config.colors?.timebar) return;
    this.timebarColor = { background: this.config.colors.timebar as string };
  }
}
