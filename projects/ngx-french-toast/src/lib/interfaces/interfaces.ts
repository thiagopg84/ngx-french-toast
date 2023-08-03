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
  /**
   * The title of the Toast.
   * @type string
   */
  title: string;
  /**
   * The content of the Toast.
   * @type string
   */
  content?: string | null;
  /**
   * The duration of the Toast.
   * @type number
   */
  duration?: number | null;
  /**
   * The id of the Toast. If blank, will be automatically generated.
   * @type string
   */
  _id?: string;
  /**
   * The icon of the Toast.
   * @type string
   */
  icon?: string | null;
  /**
   * A dynamically imported component within the Toast.
   * @type any
   */
  component?: any;
  /**
   * Whether or not the Toast should expire.
   * @type boolean
   * @default false
   */
  infinite?: boolean;
};

export interface ToastModel extends ToastInputModel {
  isVisible: boolean;
  type: 'success' | 'danger' | 'info' | 'warning';
};
