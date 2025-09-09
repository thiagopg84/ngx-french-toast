import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentRef,
  HostListener,
  OnInit,
  ViewContainerRef,
  input,
  output,
  viewChild,
  inject,
  signal,
  OnDestroy
} from '@angular/core';
import { ToastModel } from '../../../interfaces/interfaces';
import { ToastConfig } from '../../../interfaces/interfaces';
import { TOAST_CONFIG } from '../../../toast.tokens';
import { ToastPosition } from '../../../enums/enums';
import { darkenHexColor } from '../../../utils/utils';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss', '../../../styles/common-styles.scss'],
  imports: [NgStyle]
})
export class ToastComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  private config = inject<ToastConfig>(TOAST_CONFIG);

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
  readonly container = viewChild.required('container', { read: ViewContainerRef });
  readonly toast = input.required<ToastModel>();
  readonly currentTheme = input<string>();
  readonly control = output<ToastModel>();
  isVisible = signal(false);
  duration!: number;
  remainingTime!: number;
  timeout!: any;
  resumeTime!: Date;
  component!: ComponentRef<any>;
  svgUrlIsFromSprite: boolean = false;
  position: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomRight: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomLeft: ToastPosition = ToastPosition.BOTTOM_LEFT;
  topRight: ToastPosition = ToastPosition.TOP_RIGHT;
  topLeft: ToastPosition = ToastPosition.TOP_LEFT;
  linearGradient: string = '';
  toastConfig!: ToastConfig;
  timebarColor!: { background: string };
  textColor: string = '';
  style: string = '';

  constructor() {
    this.toastConfig = this.config;
    if (this.toastConfig.position) {
      this.position = this.toastConfig.position;
    }
  }

  ngAfterViewInit(): void {
    if (this.toast().component) {
      this.createDynamicToast();
    }
  }

  ngOnInit(): void {
    this.getColors();
    const toast = this.toast();
    this.svgUrlIsFromSprite = toast.icon?.includes('.svg#') as boolean;
    if (toast?.infinite) return;
    this.duration = Number(toast.duration);
    this.remainingTime = Number(toast.duration);
    this.resumeTime = new Date();
    this.timeout = setTimeout(() => {
      this.destroyToast();
    }, this.duration);
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  createDynamicToast(): void {
    this.container().clear();
    this.component = this.container().createComponent(this.toast().component);
    this.component.instance.content = this.toast().content;
    const toast = this.toast();
    if (toast?.context) {
      this.component.instance.context = toast.context;
    }
  }

  destroyToast() {
    this.isVisible.set(false);
    setTimeout(() => {
      this.control.emit(this.toast());
    }, 100);
  }

  onMouseEnter() {
    if (this.toast()?.infinite) return;
    clearTimeout(this.timeout);
    const diff = new Date().getTime() - this.resumeTime.getTime();
    this.remainingTime -= diff;
  }

  onMouseLeave() {
    if (this.toast()?.infinite) return;
    this.resumeTime = new Date();
    this.timeout = setTimeout(() => {
      this.destroyToast();
    }, this.remainingTime);
  }

  getColors(): void {
    this.getToastStyle();
    this.getTimebarColor();
  }

  getToastStyle(): void {
    this.textColor = this.getToastTextColor();
    this.style = `--text-color: ${this.textColor};`;
    const colorHexCode: string = this.toastConfig?.colors?.[this.toast().type] as string;
    if (!colorHexCode) return;
    const darkenedColorHexCode = darkenHexColor(colorHexCode as string, 0.725);
    this.linearGradient = this.config.colors?.autoGradient
      ? `linear-gradient(45deg, ${darkenedColorHexCode}, ${colorHexCode})`
      : colorHexCode;
    this.style += `background: ${this.linearGradient}`;
  }

  getToastTextColor(): string {
    const toastTypeText = this.toast().type + 'Text';
    const textColorHexCode =
      this.config.colors?.[toastTypeText as 'successText' | 'dangerText' | 'infoText' | 'warningText'] || '#ffffff';
    return textColorHexCode;
  }

  getTimebarColor(): void {
    if (!this.toastConfig.colors?.timebar) return;
    this.timebarColor = {
      background: this.toastConfig.colors?.timebar as string
    };
  }
}
