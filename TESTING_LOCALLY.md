# Testing locally before publishing to npm

## 1. Build the library

From the root of the `ngx-french-toast` repository:

```bash
yarn test-build
```

This runs `ng-packagr` and outputs the compiled library to `dist/ngx-french-toast/`.

---

## 2. Generate the tarball

```bash
yarn tarball
```

Generates `dist/ngx-french-toast.tar.gz`.

---

## 3. Install in a test project

In a separate Angular 20 project, install the package pointing to the absolute path of the tarball:

```bash
npm install /absolute/path/to/ngx-french-toast/dist/ngx-french-toast.tar.gz
```

> If reinstalling after a new build, delete `node_modules/ngx-french-toast` first or run with `--force`.

---

## 4. Configure

**Standalone (app.config.ts):**

```typescript
import { provideFrenchToast, ToastPosition } from 'ngx-french-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFrenchToast({
      defaultDuration: 5000,
      position: ToastPosition.TOP_RIGHT
    })
  ]
};
```

**NgModule (app.module.ts):**

```typescript
import { FrenchToastModule } from 'ngx-french-toast';

@NgModule({
  imports: [FrenchToastModule.forRoot({ defaultDuration: 5000 })]
})
export class AppModule {}
```

---

## 5. Test

```typescript
import { Component, inject } from '@angular/core';
import { ToastService } from 'ngx-french-toast';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<button (click)="test()">Toast</button>`
})
export class AppComponent {
  private toastService = inject(ToastService);

  test(): void {
    this.toastService.success({ title: 'Success!' });
    this.toastService.danger({ title: 'Danger', content: 'Something went wrong' });
    this.toastService.info({ title: 'Info' });
    this.toastService.warning({ title: 'Warning' });
  }
}
```

---

## Pre-publish checklist

- [ ] Entry animation (slide-in)
- [ ] Exit animation (slide-out on click or expiry)
- [ ] Toast limit enforced even when adding toasts rapidly
- [ ] `clearAllToasts()` animates all toasts out
- [ ] `infinite: true` never expires
- [ ] `pinned: true` is not removed by the limit
- [ ] Dynamically embedded component renders correctly
- [ ] `destroyToast()` closes the correct toast from an embedded component
- [ ] Positions: bottom-right, bottom-left, top-right, top-left
- [ ] Custom colors and `autoGradient`
