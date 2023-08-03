# ngx-french-toast Changelog

All notable changes to the `ngx-french-toast` library will be documented in this file.

---
## **1.0** (2023-08-02)

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