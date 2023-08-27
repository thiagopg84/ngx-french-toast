# ngx-french-toast Changelog

All notable changes to the `ngx-french-toast` library will be documented in this file.

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