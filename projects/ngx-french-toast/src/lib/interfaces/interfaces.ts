import { ToastPosition } from "../enums/enums";

export interface ToastConfig {
  position?: ToastPosition | undefined;
  defaultDuration?: number | undefined;
  colors?: {
    success?: string | undefined;
    danger?: string | undefined;
    warning?: string | undefined;
    info?: string | undefined;
  } | undefined;
}

export interface ToastInputModel {
  title: string;
  content?: string;
  duration?: number;
  _id?: string;
  icon?: string | null;
  customIcon?: boolean;
  component?: any;
  functionality?: string;
};

export interface ToastModel extends ToastInputModel {
  isVisible: boolean;
  type: 'success' | 'danger' | 'info' | 'warning';
};