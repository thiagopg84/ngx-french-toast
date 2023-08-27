import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {

  @Output() destroyToast: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  context!: {
    content: string
  };

  constructor() { }

  rate(rate: number): void {
    console.log(rate);
    this.destroyToast.emit(true);
  }

  ngOnInit(): void {
    console.log('Dynamically injected data:')
    console.log(this.context.content);
  }

}
