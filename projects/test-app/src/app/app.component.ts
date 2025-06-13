import { Component } from '@angular/core';
import { ToastService } from 'projects/ngx-french-toast/src/lib/french-toast.service';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'Title';
  color1: string = '#ff0000';
  color2: string = '';
  linearGradient: string = '';
  icon!: boolean;
  dynamicComponent!: boolean;
  toastType: 'success' | 'warning' | 'danger' | 'info' = 'success';
  duration: number = 10000;
  content: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  infinite: boolean = false;
  pinned: boolean = false;
  dynamicContent: string = '';

  constructor(private toastService: ToastService) {}

  addToast(): void {
    this.toastService[this.toastType]({
      title: this.title,
      content: this.dynamicComponent ? null : this.content,
      duration: this.duration,
      component: this.dynamicComponent ? DynamicComponentComponent : null,
      icon: this.icon ? '../assets/svg/sprite.svg#icon-add-marker' : null,
      infinite: this.infinite,
      pinned: this.pinned,
      context: this.dynamicComponent ? { content: this.dynamicContent } : null
      // icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png'
    })
  }

  clearAllToasts(): void {
    this.toastService.clearAllToasts();
  }
}
