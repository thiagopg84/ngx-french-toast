import { InjectionToken } from '@angular/core';
import { ToastConfig } from './interfaces/interfaces';

export const TOAST_CONFIG = new InjectionToken<ToastConfig>('TOAST_CONFIG');