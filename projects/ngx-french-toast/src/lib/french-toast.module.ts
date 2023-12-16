import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastConfig } from './interfaces/interfaces';
import { ToastPosition } from './enums/enums';
import { TOAST_CONFIG } from './toast.tokens';

@NgModule({})

export class FrenchToastModule {
  static forRoot(config?: ToastConfig): ModuleWithProviders<FrenchToastModule> {
    if (!config) {
      config = {
        position: ToastPosition.BOTTOM_RIGHT,
        defaultDuration: 10000,
        colors: {
          autoGradient: false
        }
      }
    }
    return {
      ngModule: FrenchToastModule,
      providers: [
        { provide: TOAST_CONFIG, useValue: config }
      ]
    };
  }
}