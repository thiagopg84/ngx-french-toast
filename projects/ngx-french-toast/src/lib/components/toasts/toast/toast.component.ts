import { AfterContentInit, AfterViewInit, Component, ComponentRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastModel } from '../../../interfaces/interfaces';
import { ToastConfig } from '../../../interfaces/interfaces';
import { TOAST_CONFIG } from '../../../toast.tokens';
import { ToastPosition } from '../../../enums/enums';
import { darkenHexColor } from '../../../utils/utils';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss', '../../../styles/common-styles.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgStyle
  ]
})
export class ToastComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  @Input() toast!: ToastModel;
  @Input() currentTheme!: string;
  @Output() control: EventEmitter<ToastModel> = new EventEmitter<ToastModel>();
  private destroy$ = new Subject<void>();
  isVisible: boolean = false;
  duration!: number;
  remainingTime!: number;
  timeout!: number;
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

  constructor(@Inject(TOAST_CONFIG) private config: ToastConfig) {
    this.toastConfig = this.config;
    if (this.toastConfig.position) {
      this.position = this.toastConfig.position;
    }
  }

  ngAfterViewInit(): void {
    if (this.toast.component) {
      this.createDynamicToast();
    }
  }

  ngOnInit(): void {
    this.getColors();
    this.svgUrlIsFromSprite = this.toast.icon?.includes('.svg#') as boolean;
    if (this.toast?.infinite) return;
    this.duration = Number(this.toast.duration);
    this.remainingTime = Number(this.toast.duration);
    this.resumeTime = new Date();
    this.timeout = window.setTimeout(() => {
      this.destroyToast();
    }, this.duration);
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 10);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createDynamicToast(): void {
    this.container.clear();
    setTimeout(() => {
      this.component = this.container.createComponent(this.toast.component);
      this.component.instance.content = this.toast.content;
      if (this.toast?.context) {
        this.component.instance.context = this.toast.context;
      }
    }, 0);
  }

  destroyToast() {
    this.isVisible = false;
    setTimeout(() => {
      this.toast.isVisible = false;
      this.control.emit(this.toast);
    }, 100);
  }

  onMouseEnter() {
    if (this.toast?.infinite) return;
    clearTimeout(this.timeout);
    const diff = new Date().getTime() - this.resumeTime.getTime();
    this.remainingTime -= diff;
  }

  onMouseLeave() {
    if (this.toast?.infinite) return;
    this.resumeTime = new Date();
    this.timeout = window.setTimeout(() => {
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
    const colorHexCode: string = this.toastConfig?.colors?.[this.toast.type] as string;
    if (!colorHexCode) return;
    const darkenedColorHexCode = darkenHexColor(colorHexCode as string, .725)
    this.linearGradient = this.config.colors?.autoGradient ? `linear-gradient(45deg, ${darkenedColorHexCode}, ${colorHexCode})` : colorHexCode;
    this.style += `background: ${this.linearGradient}`;
  }

  getToastTextColor(): string {
    const toastTypeText = this.toast.type + 'Text';
    const textColorHexCode = this.config.colors?.[toastTypeText as 'successText' | 'dangerText' | 'infoText' | 'warningText'] || '#ffffff';
    return textColorHexCode;
  }

  getTimebarColor(): void {
    if (!this.toastConfig.colors?.timebar) return;
    this.timebarColor = {
      background: this.toastConfig.colors?.timebar as string
    };
  }
}