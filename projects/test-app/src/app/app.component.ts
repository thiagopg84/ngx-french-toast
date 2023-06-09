import { Component, OnInit } from '@angular/core';
import { ToastService } from 'projects/ngx-french-toast/src/lib/french-toast.service';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  color1: string = '#ff0000';
  color2: string = '';
  linearGradient: string = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.danger({
      title: 'TESTING',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu!!!',
      // duration: 100000,
      // icon: '../assets/svg/sprite.svg#icon-reorder-cameras'
      // icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png'
    })
  }

  addToast(): void {
    this.toastService.success({
      title: 'TESTING',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu!!!',
      // duration: 200000,
      icon: '../assets/svg/sprite.svg#icon-reorder-cameras',
      component: DynamicComponentComponent
      // icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/768px-Sign-check-icon.png'
    })
  }
}
