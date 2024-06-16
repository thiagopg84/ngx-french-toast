import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from 'projects/ngx-french-toast/src/lib/components/toasts/toast/toast.component';
import { ToastService } from 'projects/ngx-french-toast/src/lib/french-toast.service';


@Component({
  selector: 'app-dynamic-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {
  context!: {
    content: string
  };

  constructor(private toastService: ToastService, private toast: ToastComponent) { }

  rate(rate: number): void {
    console.log(rate);
    this.closeToast();
  }

  ngOnInit(): void {
    console.log('Dynamically injected data:')
    console.log(this.context.content);
  }

  closeToast(): void {
    this.toastService.destroyToast(this.toast);
  }
}
