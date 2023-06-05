import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ToastComponent } from './components/toasts/toast/toast.component';
import { CommonModule } from '@angular/common';
import { ToastConfig } from './interfaces/interfaces';
import { TOAST_CONFIG } from './toast.tokens';

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
  static forRoot(config: ToastConfig): ModuleWithProviders<FrenchToastModule> {
    return {
      ngModule: FrenchToastModule,
      providers: [
        { provide: TOAST_CONFIG, useValue: config }
      ]
    };
  }
}