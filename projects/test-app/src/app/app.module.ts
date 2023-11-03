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
        // success: '#58D77C',
        // danger: '#f77676',
      },
      limit: 3,
      font: {
        contentFontSize: '13px',
        titleFontSize: '15px',
        family: 'Athiti'
      }
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
