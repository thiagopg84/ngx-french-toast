<pre><code># ngx-french-toast

![ngx-french-toast logo](logo.png){:width="134px" height="200px"}

A light-weight toast library for Angular 14+.

## Features

- Fully built in Angular 14, without any external dependencies
- Customizable toast appearance, including duration, colors, and positioning
- Unique feature: Dynamically embed components within the toast for maximum flexibility and creativity

## Installation

To install ngx-french-toast, simply follow these steps:

1. Run the following command to install the package via npm:

  <pre><code>npm install ngx-french-toast</code></pre>

2. Import the `FrenchToastModule` in your Angular module:

  <pre><code>```typescript
  import { FrenchToastModule } from 'ngx-french-toast';
  import { ToastPosition } from 'ngx-french-toast';

  // optional configuration object:
    const config: ToastConfig = {
      colors: {
        danger: '#a20000',
        info: '#2d96f8',
        success: '#2df877',
        warning: '#f8bb2d'
      },
      defaultDuration: 100000,
      position: ToastPosition.BOTTOM_RIGHT
    };

   @NgModule({
    imports: [
      // ...
      FrenchToastModule.forRoot(config)
    ],
    // ...
  })
  export class AppModule { }
  ```</code></pre>

3. Add the `FrenchToastComponent` selector in your `app.component.html` (or wherever you want to):

```html
<french-toast></french-toast>
```

This will ensure that the ngx-french-toast component is rendered in your application.

4. That's it! You're ready to start using ngx-french-toast in your Angular application.

## Usage

Here's a simple example demonstrating how to use ngx-french-toast:

```typescript
import { Component } from '@angular/core';
import { ToastService } from 'ngx-french-toast';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showToast()">Show Toast</button>
  `
})
export class ExampleComponent {
  constructor(private toastService: ToastService) {}

  showToast(): void {
    this.toastService.success({
      title: 'Knock, knock!',
      content: 'Who\'s there? Eiffel. Eiffel who? Eiffel in love with you!'
    });
  }
}
```

### Embedding Components Dynamically

To embed components dynamically, follow these steps:

1. Call any method from your instance of `ToastService` and pass an object with the `component` and `title`. For example:

   ```typescript
   this.toastService.success({ component: ExampleComponent, title: 'Oui, mon ami!' });
   ```

2. In the embedded component (e.g., `ExampleComponent`), create an `EventEmitter` called `destroyToast` and emit `true` when you want to close the parent toast. For example:

   ```typescript
   import { Output, EventEmitter } from '@angular/core';

   @Component({
     selector: 'app-example',
     template: `
       <button (click)="rate(5, $event)">Five stars!</button>;
     `
   })
   export class ExampleComponent {
     @Output() destroyToast: EventEmitter<boolean> = new EventEmitter<boolean>(false);

     rate(rate: number, event: Event): void {
       event.stopPropagation();
       this.someApi.rate(rate).subscribe({
         next: () => {
           this.destroyToast.emit(true);
         }
       });
     }
   }
   ```

   The `destroyToast` event emitter allows the embedded component to communicate with the parent toast and close it.

### Using Icons

You can customize the toast appearance by adding icons. Simply pass an `icon` property inside the config object when calling the toast service. The `icon` property accepts a string that can link directly to images or SVG sprite files. Here are a few examples:

- Using an SVG from a sprite:

   ```typescript
   this.toastService.success({ title: 'Success', icon: '../assets/svg/sprite.svg#icon-success' });
   ```

- Using an image:

   ```typescript
   this.toastService.success({ title: 'Success', icon: '../assets/imgs/success.png' });
   ```

   Note: Make sure to provide the correct path to the image or SVG file.

## Contributions

Contributions to ngx-french-toast are welcome! If you find a bug, have a feature request, or want to contribute code improvements, please submit an issue, or fork it, or just let me know and we'll figure it out :D

## License

ngx-french-toast is licensed under the GNU General Public License (GPL).

This means that you are free to use, modify, and distribute this library under the terms of the GPL license. However, please note the following key points regarding the GPL:

- Any modifications or derivative works you make to ngx-french-toast must be distributed under the same GPL license.
- If you distribute ngx-french-toast as part of another project, that project must also be licensed under the GPL if it includes or uses ngx-french-toast code.

For more details, please refer to the GNU General Public License (GPL) file.

## Contact
If you have any questions, suggestions, or feedback, you can reach out to me via <a href="mailto:thiago2k9@gmail.com">thiago2k9@gmail.com</a> or find me on <a href="https://linkedin.com/in/thiagoguterman" target="_blank">LinkedIn</a>.

Made with ❤️ with ![Angular](angular.svg){:width="100px" height="100px"}

Thank you for using ngx-french-toast! I hope it brings a touch of humor and creativity to your Angular applications.
</code></pre>
```
