import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { CheckItem } from '../interface/select-item';

@Component({
  selector: 'app-share-mat-list',
  templateUrl: './share-mat-list.component.html',
  styleUrls: ['./share-mat-list.component.scss']
})
export class ShareMatListComponent {

  @Input() checks: CheckItem[] = []
  onItemDropped($event: CdkDragDrop<any[]>) {
  }
  onCheckboxListChange(check: CheckItem, index: number) {

  }
}
