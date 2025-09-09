import { Component, OnInit, inject } from '@angular/core';
import { ToastComponent } from 'projects/ngx-french-toast/src/lib/components/toasts/toast/toast.component';
import { ToastService } from 'projects/ngx-french-toast/src/lib/french-toast.service';

@Component({
  selector: 'app-dynamic-component',
  imports: [],
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit {
  private toastService = inject(ToastService);
  private toast = inject(ToastComponent);

  context!: {
    content: string;
  };

  rate(rate: number): void {
    console.log(rate);
    this.closeToast();
  }

  ngOnInit(): void {
    console.log('Dynamically injected data:');
    console.log(this.context.content);
  }

  closeToast(): void {
    this.toastService.destroyToast(this.toast);
  }
}
