import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFrenchToast } from 'projects/ngx-french-toast/src/lib/providers/french-toast.provider';
import { ToastPosition } from 'projects/ngx-french-toast/src/lib/enums/enums';

bootstrapApplication(AppComponent, {
  providers: [
    provideFrenchToast({
      defaultDuration: 10000,
      position: ToastPosition.BOTTOM_RIGHT,
      limit: 3,
      font: {
        contentFontSize: '13px',
        titleFontSize: '15px',
        family: 'Athiti'
      },
      colors: {
        // autoGradient: true,
        // success: 'linear-gradient(45deg, rgb(0, 0, 0), rgb(58 58 58))',
        timebar: '#ffff00'
      }
    })
  ]
})
  .catch((err) => console.error(err));
