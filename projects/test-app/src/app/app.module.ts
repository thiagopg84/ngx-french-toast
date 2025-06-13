import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrenchToastModule } from 'projects/ngx-french-toast/src/public-api';
import { ToastPosition } from 'projects/ngx-french-toast/src/lib/enums/enums';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DynamicComponentComponent],
  imports: [
    BrowserModule,
    FrenchToastModule.forRoot({
      defaultDuration: 10000,
      position: ToastPosition.BOTTOM_RIGHT,
      colors: {
        successText: '#fff',
        success: '##28a961',
        timebar: 'rgba(13, 13, 13, .40)',
        autoGradient: false,
        danger: '#6c0404',
        dangerText: '#ffff00',
      },
      limit: 5,
      font: {
        contentFontSize: '14px',
        titleFontSize: '16px',
        family: 'Athiti',
      },
    }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
