# ngx-french-toast Changelog

All notable changes to the `ngx-french-toast` library will be documented in this file.

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
