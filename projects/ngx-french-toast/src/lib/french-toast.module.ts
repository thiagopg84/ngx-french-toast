import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ToastComponent } from './components/toasts/toast/toast.component';
import { CommonModule } from '@angular/common';
import { ToastConfig } from './interfaces/interfaces';
import { TOAST_CONFIG } from './toast.tokens';
import { ToastPosition } from './enums/enums';

@NgModule({
  declarations: [
    ToastsComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastsComponent
  ]
})

export class FrenchToastModule {
  static forRoot(config?: ToastConfig): ModuleWithProviders<FrenchToastModule> {
    if (!config) {
      config = {
        position: ToastPosition.BOTTOM_RIGHT,
        defaultDuration: 10000
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