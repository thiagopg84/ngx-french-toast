import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastConfig } from './interfaces/interfaces';
import { TOAST_CONFIG, TOASTS_CONTAINER } from './toast.tokens';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({})

export class FrenchToastModule {
  static forRoot(config: Partial<ToastConfig> = {}): ModuleWithProviders<FrenchToastModule> {
    return {
      ngModule: FrenchToastModule,
      providers: [
        { provide: TOAST_CONFIG, useValue: config },
        { provide: TOASTS_CONTAINER, useValue: ToastsComponent }
      ]
    };
  }
}