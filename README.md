# ngx-french-toast
<p align="center">
  <img src="https://raw.githubusercontent.com/thiagopg84/ngx-french-toast/master/projects/ngx-french-toast/logo.png" alt="ngx-french-toast logo" width="200px" />
</p>

### <a href="https://github.com/thiagopg84/ngx-french-toast/blob/master/CHANGELOG.md"><b>Check the Changelog for updates! 📌 </b></a>

### You can test all features in <a href="https://ngx-french-toast.netlify.app/"> ngx-french-toast playground app</a>.
---
# Features

- Fully built in Angular, without any external dependencies. Oui, très indépendant!
- Customizable toast appearance, including duration, colors, and positioning. Like a beret, you can style it to perfection!
- Unique feature: Dynamically embed components within the toast for maximum flexibility and créativité. C'est magnifique!
- Total control over toast visibility: `infinite` and `pinned` properties allow users to arrange toasts based on their importance and ensure critical messages stay in focus.

<br>

## Compatibility Matrix
<table>
  <thead>
    <tr>
      <th>Angular</th>
      <th>ngx-french-toast</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>14^ - 15^</td>
      <td>1.3.x</td>
    </tr>
    <tr>
      <td>16^</td>
      <td>1.4.x</td>
    </tr>
    <tr>
      <td>17^</td>
      <td>2.x</td>
    </tr>
    <tr>
      <td>18^</td>
      <td>18.x</td>
    </tr>
  </tbody>
</table>
<hr>
<br>

# Installation

To install ngx-french-toast, simply follow these étapes:

### 1. Run the following command to install the package via npm:

```
npm install ngx-french-toast
```

### 2. Import the `FrenchToastModule` in your Angular module:

#### Standard apps
```typescript
import { FrenchToastModule, ToastPosition, ToastConfig } from 'ngx-french-toast';

// optional configuration object:
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
    timebar: 'linear-gradient(45deg, #2b6bbf, #10425b)', // Or a single color -- background color for the time bar
    autoGradient: false, // Controls whether the background will be an automatically generated gradient or not based on single input colors
  },
  defaultDuration: 100000,
  position: ToastPosition.TOP_RIGHT, // As elegant as the Eiffel Tower!
  limit: 3,
  font: {
    contentFontSize: '13px', // This will accept any CSS unit (rem, em, px etc.)
    titleFontSize: '15px', // Same here ;)
    family: 'Athiti' // Très élégant!
  }
};

@NgModule({
  imports: [
    // ...
    FrenchToastModule.forRoot(config)
  ],
  // ...
})
export class AppModule { }
```

#### Standalone apps
```typescript
import { provideFrenchToast, ToastPosition } from 'ngx-french-toast';

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

### 3. Et voilà! You're ready to start using ngx-french-toast in your Angular application.

<br>

# Usage

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
      content: 'Who\'s there? Eiffel. Eiffel who? Eiffel in love with you!' // Mon Dieu, l'amour!
    });
  }
}
```
<br>

# Toast Types

ngx-french-toast provides 4 toast types. Each of them has its own method:

- `success()`: Shows a success toast. C'est magnifique!
- `danger()`: Shows a danger toast. Oh là là!
- `info()`: Shows an info toast. Voilà!
- `warning()`: Shows a warning toast. Attention!

You can use these methods of your `ToastService` instance to show toasts in your application. For example:

```typescript
this.toastService.success({ title: 'Success', content: 'Your task has been completed with finesse!' });
this.toastService.danger({ title: 'Danger', content: 'Something went wrong! Oh là là!' });
this.toastService.info({ title: 'Info', content: 'Here are some important details for you.' });
this.toastService.warning({ title: 'Warning', content: 'Be cautious! Danger may be lurking nearby.' });
```
<br>

# Toast Input Object

Each toast has the following customizable properties:

```typescript
    this.toastService.success({
      title: 'Toast Title',
      content: 'Lorem ipsum dolor sit amet.', // this will be ignored if you're embedding a component ;)
      _id: `success-toast--${this.id}`, // if you leave it blank, the ID will be automatically generated
      component: SomeComponent,
      duration: 10000,
      icon: '../assets/svg/sprite.svg#icon-success', // or a URL of a .png, for example
      infinite: true, // if infinite is true, the duration will be ignored
      pinned: true, // when set to true, this toast will remain fixed in its position even if new toasts are added, unless the next toast is also pinned
      context: { // this will be available within SomeComponent!
        name: 'Jean Pierre',
        email: 'jetaime@lesbleus.fr'
      }
    });
```
<br>

# Embedding Components Dynamically

To embed components dynamically just call any method from your instance of `ToastService` and pass an object with the `component` and `title` properties. For example:

```typescript
this.toastService.success({
  component: ExampleComponent,
  title: 'Oui, mon ami!',
  context: {
    name: 'Jean Pierre',
    email: 'jetaime@lesbleus.fr'
  } // the content and type of context is up to you!
});
```

<br>

## Grabbing the `context` object from the embedded component
To have access to the `context` object from within your dynamically embedded component, you just have to create a `context` variable in your embedded component to receive the content you declared when calling the `ToastService`:
```typescript
context: { name: string, email: string }; // the type is up to you :)
```
<br>

## Programmatically closing the parent toast from the embedded component
To close the parent toast from the embedded component, users should follow these steps:

### ⚠️ Attention! This is a breaking change.
~~1. In the embedded component (e.g., `ExampleComponent`), define an `EventEmitter` named `destroyToast` as an `@Output()` property:~~

```diff
- @Output() destroyToast: EventEmitter<boolean> = new EventEmitter<boolean>(false);
```
1. In the embedded component (e.g., `ExampleComponent`), inject an instance of `ToastService` and the parent component (`ToastComponent`) as dependencies:
```typescript
import { ToastComponent, ToastService } from 'ngx-french-toast';

constructor(private toastService: ToastService, private toast: ToastComponent) {}
```

2. Call the `destroyToast` method from `ToastService`, passing the parent component as a parameter:

```typescript
closeToast(): void {
  this.toastService.destroyToast(this.toast);
}
```

<br>

To summarize, here's an example for the whole section:

```typescript
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <p>My email: {{ context.email }}</p>
    <button (click)="rate(5)">Five stars!</button>;
  `
})
export class ExampleComponent {
  context: { name: string, email: string };

  constructor(private toastService: ToastService, private toast: ToastComponent) {}

  rate(rate: number): void {
    this.someApi.rate(rate).subscribe({
      next: () => {
        this.toastService.destroyToast(this.toast);
      }
    });
  }
}
```

Passing the parent component to the `destroyToast` method allows `ToastService` to find the `ToastComponent` within visible toasts and close it. Très beau!

<br>

# Using Icons

You can customize the toast appearance by adding icons. Simply pass an `icon` property inside the config object when calling the toast service. The `icon` property accepts a string that can link directly to images or SVG sprite files. Here are a few examples:

Using an SVG from a sprite:

```typescript
this.toastService.success({ title: 'Success', icon: '../assets/svg/sprite.svg#icon-success' }); // Comme un baguette of success!
```

Using an image:

```typescript
this.toastService.success({ title: 'Success', icon: '../assets/imgs/success.png' }); // C'est magnifique!
```

Note: Make sure to provide the correct path to the image or SVG file. Parfait!

<br>

# Clearing Toasts Programmatically

Sometimes, you might need to remove all toasts from the screen at once. To do this programmatically, simply call the `clearAllToasts()` method from your `ToastService` instance:

```typescript
this.toastService.clearAllToasts();
```

This can be particularly useful when, for instance, you want to reset the toast notifications or clear the screen after a certain action has been taken.

<br>

# Contributions

Contributions to ngx-french-toast are welcome! If you find a bug, have a feature request, or want to contribute code improvements, please submit an issue, or fork it, or just let me know and we'll figure it out 😊

<br>

# Contact

If you have any questions, suggestions, or feedback, you can reach out to me via <a mailto="thiago2k9@gmail.com">thiago2k9@gmail.com</a> or find me on <a href="https://www.linkedin.com/in/thiagoguterman" target="_blank">LinkedIn</a>. Don't hesitate to say "Bonjour!" and share your thoughts. Let's connect and make the ngx-french-toast community even stronger! 💪🥐

Made with ❤️ (and lots of croissants) for Angular  <img src="https://raw.githubusercontent.com/thiagopg84/ngx-french-toast/dec8ce282b401a89bc4a4bb536a0662888290eda/projects/ngx-french-toast/angular.svg" alt="Angular Logo" width="15px" height="15px" />.

Merci beaucoup for using ngx-french-toast! I hope it brings a touch of créativité to your Angular applications. Bon appétit! 🍞