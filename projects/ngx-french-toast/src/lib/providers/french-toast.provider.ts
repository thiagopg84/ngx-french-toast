import { EnvironmentProviders, Provider, makeEnvironmentProviders } from "@angular/core";
import { ToastConfig } from "../interfaces/interfaces";
import { TOAST_CONFIG, TOASTS_CONTAINER } from "../toast.tokens";
import { ToastsComponent } from "../components/toasts/toasts.component";

export const provideFrenchToast = (config: Partial<ToastConfig> = {}): EnvironmentProviders => {
  const providers: Provider[] = [
    { provide: TOAST_CONFIG, useValue: config },
    { provide: TOASTS_CONTAINER, useValue: ToastsComponent }
  ];
  return makeEnvironmentProviders(providers);
};