import { ToastPosition } from '../enums/enums';

/**
 * Configuration options for customizing toast behavior and appearance.
 */
export interface ToastConfig {
  /**
   * The screen position for displaying toasts.
   * @type {ToastPosition}
   * @default {ToastPosition.BOTTOM_RIGHT}
   */
  position?: ToastPosition | undefined;

  /**
   * The default duration time for toasts in milliseconds.
   * @type {number}
   * @default 7000
   */
  defaultDuration?: number | undefined;

  /**
   * Colors configuration for different types of toasts.
   */
  colors?: {
    /**
     * The background color of the success toast.
     * Accepts formats such as '#ffffff', '#fff', 'white', or 'linear-gradient(45deg, rgb(0, 0, 0), rgb(58 58 58))'.
     * @type {string}
     */
    success?: string | undefined;

    /**
     * The text color of the success toast.
     * @type {string}
     * @default '#ffffff'
     */
    successText?: string | undefined;

    /**
     * The background color of the danger toast.
     * Accepts formats such as '#ffffff', '#fff', 'white', or 'linear-gradient(45deg, rgb(0, 0, 0), rgb(58 58 58))'.
     * @type {string}
     */
    danger?: string | undefined;

    /**
     * The text color of the danger toast.
     * @type {string}
     * @default '#ffffff'
     */
    dangerText?: string | undefined;

    /**
     * The background color of the warning toast.
     * Accepts formats such as '#ffffff', '#fff', 'white', or 'linear-gradient(45deg, rgb(0, 0, 0), rgb(58 58 58))'.
     * @type {string}
     */
    warning?: string | undefined;

    /**
     * The text color of the warning toast.
     * @type {string}
     * @default '#ffffff'
     */
    warningText?: string | undefined;

    /**
     * The background color of the info toast.
     * Accepts formats such as '#ffffff', '#fff', 'white', or 'linear-gradient(45deg, rgb(0, 0, 0), rgb(58 58 58))'.
     * @type {string}
     */
    info?: string | undefined;

    /**
     * The text color of the info toast.
     * @type {string}
     * @default '#ffffff'
     */
    infoText?: string | undefined;

    /**
     * The color of the time bar associated with the toast.
     * Accepts formats such as '#ffffff', '#fff', 'white', or 'linear-gradient(45deg, rgb(0, 0, 0), rgb(58 58 58))'.
     * @type {string}
     */
    timebar?: string | undefined;

    /**
     * Determines whether the background should feature an automatically generated gradient or not.
     * @type {boolean}
     * @default false
     *
     * This option allows for dynamic and visually appealing background variations based on one specific color input.
     * Please note that the `autoGradient` feature is compatible only with hex color codes consisting of 6 digits.
     */
    autoGradient?: boolean | undefined;
  } | undefined;

  /**
   * Controls the maximum number of toasts displayed on the screen simultaneously.
   * @type {number}
   * @default 3
   * @description Set this property to limit the concurrent display of toasts on the screen. Adjusting the limit can help manage visual clutter and ensure a user-friendly experience by restricting the number of simultaneous notifications.
   */
  limit?: number | undefined;

  /**
   * Font styling options for the toast title and content.
   */
  font?: {
    /**
     * Font family for both title and content.
     * @type {string}
     * @default 'sans-serif'
     */
    family?: string | undefined;

    /**
     * The title font-size.
     * @type {string}
     * @default '1.2rem'
     */
    titleFontSize?: string | undefined;

    /**
     * The content font-size.
     * @type {string}
     * @default '1rem'
     */
    contentFontSize?: string | undefined;
  };
}

/**
 * Input model for creating a new toast.
 */
export interface ToastInputModel {
  /**
   * The title of the toast.
   * @type {string}
   */
  title: string;

  /**
   * The content of the toast.
   * @type {string | null}
   */
  content?: string | null;

  /**
   * The duration of the toast in milliseconds.
   * @type {number | null}
   */
  duration?: number | null;

  /**
   * The unique identifier for the toast. If blank, it will be automatically generated.
   * @type {string}
   */
  _id?: string;

  /**
   * The icon associated with the toast.
   * @type {string | null}
   */
  icon?: string | null;

  /**
   * A dynamically imported component within the toast.
   * @type {any}
   */
  component?: any;

  /**
   * Whether or not the toast should persist indefinitely.
   * @type {boolean}
   * @default false
   */
  infinite?: boolean;

  /**
   * When set to true, this toast will remain fixed in its position even if new toasts are added, unless the next toast is also pinned.
   * @type {boolean}
   * @default false
   */
  pinned?: boolean;

  /**
   * Data to be passed into the dynamically imported component.
   * @type {any}
   */
  context?: any;
}

/**
 * Model representing a toast with additional properties for internal tracking.
 */
export interface ToastModel extends ToastInputModel {
  /**
   * Indicates whether the toast is currently visible.
   * @type {boolean}
   */
  isVisible: boolean;

  /**
   * The type of the toast, such as 'success', 'danger', 'info', or 'warning'.
   * @type {'success' | 'danger' | 'info' | 'warning'}
   */
  type: 'success' | 'danger' | 'info' | 'warning';
}