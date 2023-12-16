# ngx-french-toast Changelog

All notable changes to the `ngx-french-toast` library will be documented in this file.

---
## **2.1.0** (2023-12-15)

### Added
- **Colors Configuration:** Introducing a new feature that allows users to customize toast colors. Now, you have full control over the background and text colors for different types of toasts. See the updated configuration options in the documentation to get started. Don't forget that these are optional and the library provides fallback for every configuration.

```typescript
import { FrenchToastModule, ToastPosition, ToastConfig } from 'ngx-french-toast';

const config: ToastConfig = {
  colors: {
    danger: '#a20000', // Background color for the danger toast
    dangerText: '#ffffff', // Text color for the danger toast
    info: '#2d96f8', // Background color for the info toast
    infoText: '#ffffff', // Text color for the info toast
    success: '#2df877', // Background color for the success toast
    successText: '#ffffff', // Text color for the success toast
    warning: '#f8bb2d', // Background color for the warning toast
    warningText: '#ffffff', // Text color for the warning toast
    timebar: 'linear-gradient(45deg, #2b6bbf, #10425b)', // Background color for the time bar
    autoGradient: false, // Controls whether the background will be an automatically generated gradient or not based on single input colors
  },
};
```

---

## **2.0.0** (2023-12-15)

### ⚠️ BREAKING CHANGE! ⚠️
- **Angular Update:** Implemented support for and migrated to the latest *Angular 17*. Consequently, this release is exclusively compatible with Angular 17 projects.

<p>Ensure that your Angular applications are upgraded to version 17 to take advantage of its enhanced features and optimizations.</p>

---

## **1.4.0** (2023-12-10)

### ⚠️ BREAKING CHANGES! ⚠️
- **Angular/CDK Integration:** The toast rendering mechanism has been revamped using Angular Component Development Kit (CDK) Portals. Users no longer need to add the `<french-toast></french-toast>` selector to their templates. This change simplifies integration and provides a more streamlined user experience.
- **Angular Update:** Migrated ngx-french-toast to Angular 16. Ensure that your Angular applications are also updated to the latest version for seamless integration.

### Added
- **Standalone Application Support:** ngx-french-toast now can be initialized without the need for a module:
```typescript
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
      }
    })
  ]
})
  .catch((err) => console.error(err));
```

### Improved
- `ToastComponent` and `ToastsComponent` are now Standalone.
---
## **1.3.0** (2023-11-03)

### Added

- Introducing a font object in the ToastConfig interface, offering enhanced customization of font attributes for your toasts. Define custom font family, title font size, and content font size.
```typescript
@NgModule({
  ...
  imports: [
    FrenchToastModule.forRoot({
      font: {
        contentFontSize: '13px',
        titleFontSize: '15px',
        family: 'Athiti'
      }
    })
  ],
  ...
})
```
---
## **1.2.1** (2023-08-27)

### Improved

- Revised the `OnDestroy` approach: `destroy$` is now a `Subject` of type `void` instead of `boolean`;
- Revised the approach for handling clicks on dynamically embedded components. To enhance user experience (and to make things easier for developers), Toasts containing embedded components will now feature a dedicated `✕` button for convenient closure. This change ensures that clicking on the Toast body will no longer trigger its automatic dismissal. Therefore, manually preventing the click event from propagating in your embedded component is no longer necessary:
```typescript
  rate(
    rate: number,
    // event: Event (no longer necessary!)
  ): void {
    // event.stopPropagation(); (no longer necessary!)
    this.someApi.rate(rate)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => { this.destroyToast.emit(true); })
  }
```
---
## **1.2.0** (2023-08-18)

### Added

- Introduced enhanced component embedding. You can now seamlessly pass context data to dynamically embedded components within toasts:

  ```typescript
  this.toastService.success({
    title: 'Dynamic Components!',
    component: MyLovelyComponent
    context: {
      name: 'Jean Pierre',
      email: 'jetaime@lesbleus.fr'
    }
  });

  @Component(...)
  export class MyLovelyComponent {
    @Input() context!: {
      name: string,
      email: string
    };
  }
  ```

---
## **1.1.0** (2023-08-12)

### Added

- Introduced the pinned property to ToastInputModel, enabling users to control whether a Toast should remain fixed on the screen. This feature offers complete autonomy over toast behavior. Combining pinned with fixed ensures the toast remains perpetually visible, unaffected by other toasts (unless other pinned toasts are subsequently added).

  ```typescript
  this.toastService.success({
    title: 'I shall remain!',
    content: 'Other toasts shall flock around me :P',
    pinned: true
  });
  ```

---
## **1.0.0** (2023-08-02)

### Added

- Added the property `infinite` to `ToastInputModel` to control whether or not the Toast expires.

  ```typescript
  this.toastService.success({
    title: 'I will not go away!',
    content: 'I will not expire and won\'t have a countdown :)',
    infinite: true
  })
  ```

### Enhanced

- Improved the unsubscribe strategy across the project using `takeUntil` operator.
---
## **0.9.91** (2023-07-18)

### Updated

- Updated Angular version to 15.2.9.

### Fixed

- Fixed `peerDependencies` to allow users to use the library in Angular 16 applications as well.

### Enhanced
- Implemented a playground in `test-app` so that users can take a better look at how easy it is to implement the library :)
---
## **0.9.9** (2023-07-01)

### Fixed

- Fixed `peerDependencies` to allow users to use the library in Angular 15 applications as well.
---

## **0.9.8** (2023-06-26)

### Added

- Implemented functionality to allow users to change the limit of toasts in the screen
  - When importing `FrenchToastModule` you now can pass a value for the `ToastConfig.limit` property:
  ```typescript
  @NgModule({
    ...
    imports: [
      FrenchToastModule.forRoot({
        defaultDuration: 10000,
        position: ToastPosition.BOTTOM_RIGHT,
        colors: {},
        limit: 3
      })
    ],
    ...
  })
  ```
---
## **0.9.7** (2023-06-17)

### Added

- Implemented functionality to allow users to change the time-bar color
  - When importing `FrenchToastModule` you now can pass a value for the `ToastConfig.colors.timebar` property:
  ```typescript
  @NgModule({
    ...
    imports: [
      FrenchToastModule.forRoot({
        defaultDuration: 10000,
        position: ToastPosition.BOTTOM_RIGHT,
        colors: {
          timebar: '#ffaa00',
          // or even a gradient:
          // timebar: 'linear-gradient(45deg, #ffaa00, #ff6c00)' // C'est si beau!
        }
      })
    ],
    ...
  })
  ```