import { EnvironmentProviders, Provider, makeEnvironmentProviders } from "@angular/core";
import { ToastConfig } from "../interfaces/interfaces";
import { TOAST_CONFIG } from "../toast.tokens";

export const provideFrenchToast = (config: Partial<ToastConfig> = {}): EnvironmentProviders => {
  const providers: Provider[] = [
    {
      provide: TOAST_CONFIG,
      useValue: config
    }
  ];
  return makeEnvironmentProviders(providers);
};