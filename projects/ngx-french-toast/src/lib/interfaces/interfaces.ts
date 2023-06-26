import { ToastPosition } from "../enums/enums";

export interface ToastConfig {
  /**
   * The screen position for toasts.
   * @type ToastPosition
   * @default ToastPosition.BOTTOM_RIGHT
   */
  position?: ToastPosition | undefined;
  /**
   * The screen duration time for toasts (ms).
   * @type number
   * @default 7000
   */
  defaultDuration?: number | undefined;
  /**
   * The colors for the types of toasts.
   */
  colors?: {
    success?: string | undefined;
    danger?: string | undefined;
    warning?: string | undefined;
    info?: string | undefined;
    timebar?: string | undefined;
  } | undefined;
  /**
   * The limit of toasts in the screen.
   * @type number
   * @default 3
   */
  limit?: number | undefined;
}

export interface ToastInputModel {
  title: string;
  content?: string;
  duration?: number;
  _id?: string;
  icon?: string | null;
  component?: any;
};

export interface ToastModel extends ToastInputModel {
  isVisible: boolean;
  type: 'success' | 'danger' | 'info' | 'warning';
};
