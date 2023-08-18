import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {

  @Output() destroyToast: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Input() context!: {
    content: string
  };

  constructor() { }

  rate(rate: number, event: Event): void {
    console.log(rate);
    event.stopPropagation();
    this.destroyToast.emit(true);
  }

  ngOnInit(): void {
    console.log('Dynamically injected data:')
    console.log(this.context.content);
  }

}
