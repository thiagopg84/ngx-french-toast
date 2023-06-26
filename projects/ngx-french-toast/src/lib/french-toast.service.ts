import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastModel } from './interfaces/interfaces';
import { ToastInputModel } from './interfaces/interfaces';
import { ToastType } from './enums/enums';
import { ToastConfig } from './interfaces/interfaces';
import { TOAST_CONFIG } from './toast.tokens';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast: BehaviorSubject<ToastModel | null> = new BehaviorSubject<ToastModel | null>(null);
  clearAll: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private duration: number = 7000;

  constructor(@Inject(TOAST_CONFIG) private config: ToastConfig) {
    if (this.config?.defaultDuration) {
      this.duration = this.config.defaultDuration;
    }
  }

  private addToast(toastInput: ToastInputModel, type: ToastType): void {
    const newToast: ToastModel = {
      _id: toastInput._id,
      title: toastInput.title,
      content: toastInput.content,
      isVisible: true,
      duration: toastInput.duration,
      icon: toastInput?.icon ?? null,
      type,
      component: toastInput.component,
    };
    this.toast.next(newToast);
  }

  private handleToast(toastInput: ToastInputModel, type: ToastType): void {
    toastInput._id = toastInput?._id ?? this.getUniqueId(5);
    toastInput.duration = toastInput?.duration ?? this.duration;
    this.addToast(toastInput, type);
  }

  success(toastInput: ToastInputModel): void {
    this.handleToast(toastInput, ToastType.SUCCESS);
  }

  danger(toastInput: ToastInputModel): void {
    this.handleToast(toastInput, ToastType.DANGER);
  }

  info(toastInput: ToastInputModel): void {
    this.handleToast(toastInput, ToastType.INFO);
  }

  warning(toastInput: ToastInputModel): void {
    this.handleToast(toastInput, ToastType.WARNING);
  }

  clearAllToasts(): void {
    this.clearAll.next(true);
  }

  private getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('');
  }
}