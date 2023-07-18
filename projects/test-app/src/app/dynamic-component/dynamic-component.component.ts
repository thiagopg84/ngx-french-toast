import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {

  @Output() destroyToast: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  rate(rate: number, event: Event): void {
    console.log(rate);
    event.stopPropagation();
    this.destroyToast.emit(true);
  }

  ngOnInit(): void {
  }

}
