import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-checkbox',
  templateUrl: './shared-checkbox.component.html',
  styleUrls: ['./shared-checkbox.component.scss']
})
export class SharedCheckboxComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggleCheckbox() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
