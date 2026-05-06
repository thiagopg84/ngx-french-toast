import { InjectionToken, Type } from '@angular/core';
import { ToastConfig } from './interfaces/interfaces';

export const TOAST_CONFIG = new InjectionToken<ToastConfig>('TOAST_CONFIG');
export const TOASTS_CONTAINER = new InjectionToken<Type<any>>('TOASTS_CONTAINER');