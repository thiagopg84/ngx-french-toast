import { AfterContentInit, AfterViewInit, Component, ComponentRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastModel } from '../../../interfaces/interfaces';
import { ToastConfig } from '../../../interfaces/interfaces';
import { TOAST_CONFIG } from '../../../toast.tokens';
import { ToastPosition } from '../../../enums/enums';
import { darkenHexColor } from '../../../utils/utils';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss', '../../../styles/common-styles.scss'],
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
  isVisible: boolean = false;
  duration!: number;
  remainingTime!: number;
  timeout!: number;
  resumeTime!: Date;
  component!: ComponentRef<any>;
  subs!: Subscription;
  svgUrlIsFromSprite: boolean = false;
  position: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomRight: ToastPosition = ToastPosition.BOTTOM_RIGHT;
  bottomLeft: ToastPosition = ToastPosition.BOTTOM_LEFT;
  topRight: ToastPosition = ToastPosition.TOP_RIGHT;
  topLeft: ToastPosition = ToastPosition.TOP_LEFT;
  linearGradient: string = '';
  toastConfig!: ToastConfig;
  timebarColor!: { background: string };

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
    if (this.toastConfig?.colors) {
      this.getColors();
    }
    this.duration = Number(this.toast.duration);
    this.remainingTime = Number(this.toast.duration);
    this.resumeTime = new Date();
    this.svgUrlIsFromSprite = this.toast.icon?.includes('.svg#') as boolean;
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
    if (this.subs) this.subs.unsubscribe();
  }

  createDynamicToast(): void {
    this.container.clear();
    setTimeout(() => {
      this.component = this.container.createComponent(this.toast.component);
      this.component.instance.content = this.toast.content;
      this.subs = this.component.instance?.destroyToast?.subscribe({
        next: (res: boolean) => {
          if (res) {
            this.destroyToast();
          }
        }
      })
    }, 0);
  }

  destroyToast() {
    this.isVisible = false;
    setTimeout(() => {
      if (this.subs) this.subs.unsubscribe();
      this.toast.isVisible = false;
      this.control.emit(this.toast);
    }, 100);
  }

  onMouseEnter() {
    clearTimeout(this.timeout);
    const diff = new Date().getTime() - this.resumeTime.getTime();
    this.remainingTime -= diff;
  }

  onMouseLeave() {
    this.resumeTime = new Date();
    this.timeout = window.setTimeout(() => {
      this.destroyToast();
    }, this.remainingTime);
  }

  getColors(): void {
    if (!this.toastConfig?.colors) return;
    this.getToastBackgrounds();
    this.getTimebarColor();
  }

  getToastBackgrounds(): void {
    const colorHexCode: string = this.toastConfig?.colors?.[this.toast.type] as string;
    if (!colorHexCode) return;
    const darkenedColorHexCode = darkenHexColor(colorHexCode as string, .725)
    this.linearGradient = `linear-gradient(45deg, ${darkenedColorHexCode}, ${colorHexCode})`;
  }

  getTimebarColor(): void {
    if (!this.toastConfig.colors?.timebar) return;
    this.timebarColor = {
      background: this.toastConfig.colors?.timebar as string
    };
  }
}