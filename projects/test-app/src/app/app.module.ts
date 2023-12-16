import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrenchToastModule } from 'projects/ngx-french-toast/src/public-api';
import { ToastPosition } from 'projects/ngx-french-toast/src/lib/enums/enums';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentComponent
  ],
  imports: [
    BrowserModule,
    FrenchToastModule.forRoot({
      defaultDuration: 10000,
      position: ToastPosition.BOTTOM_RIGHT,
      colors: {
        successText: '#ffff00',
        success: '#125525',
        timebar: '#ffff00',
        autoGradient: true,
        danger: '#6c0404',
        dangerText: '#ffff00',
      },
      limit: 5,
      font: {
        contentFontSize: '13px',
        titleFontSize: '15px',
        family: 'Athiti',
      }
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
