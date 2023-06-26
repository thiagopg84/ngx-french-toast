import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrenchToastModule } from 'projects/ngx-french-toast/src/public-api';
import { ToastPosition } from 'projects/ngx-french-toast/src/lib/enums/enums';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentComponent
  ],
  imports: [
    BrowserModule,
    FrenchToastModule.forRoot({
      defaultDuration: 1000000,
      position: ToastPosition.BOTTOM_RIGHT,
      colors: {
        // success: '#58D77C',
        // danger: '#f77676',
      },
      limit: 3
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
