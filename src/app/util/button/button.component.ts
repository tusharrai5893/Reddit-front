import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() btnLabel: any;
  @Output() btnFuncClick = new EventEmitter<any>();
  @Input() customDisable: any;

  constructor() {}

  ngOnInit(): void {}

  btnClick($event: MouseEvent) {
    this.btnFuncClick.emit($event);
  }
}
