import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFrenchToast } from 'projects/ngx-french-toast/src/lib/providers/french-toast.provider';
import { ToastPosition } from 'projects/ngx-french-toast/src/lib/enums/enums';

bootstrapApplication(AppComponent, {
  providers: [
    provideFrenchToast({
      defaultDuration: 10000,
      position: ToastPosition.BOTTOM_RIGHT,
      limit: 2,
      font: {
        contentFontSize: '13px',
        titleFontSize: '15px',
        family: 'Athiti'
      },
      colors: {
        timebar: '#ffff00'
      }
    })
  ]
})
  .catch((err) => console.error(err));