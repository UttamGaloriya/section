import { Component, Input, ViewChild, EventEmitter } from '@angular/core';
import { CheckItem, SelectItem, selectData } from '../interface/select-item';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-shared-accordion',
  templateUrl: './shared-accordion.component.html',
  styleUrls: ['./shared-accordion.component.scss']
})
export class SharedAccordionComponent {
  @Input() selectData: SelectItem[] = []
  targetItems: any[] = [];
  connectedLists: string[] = []
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  edit() {
    console.log("edit");
  }
  ngOnInit() {
    this.connectedLists = this.selectData.map((list, index) => `list-${index}`);
  }
  onCheckboxChange(selection: SelectItem, index: number) {
    this.selectData[index].isCheckAll = !this.selectData[index].isCheckAll
    let toggle = this.selectData[index].isCheckAll
    if (toggle) {
      this.selectData[index].checks?.map(res => res.isCheck = true)
    } else {
      this.selectData[index].checks?.map(res => res.isCheck = false)
    }
  }

  onCheckboxListChange(selection: SelectItem, index: number, checkNumber: number) {
    let check = this.selectData[index]?.checks
    if (check != undefined) {
      let specificCheck = check[checkNumber] ?? [];
      if (specificCheck.isCheck) {
        specificCheck.isCheck = !specificCheck.check
      } else {
        specificCheck.isCheck = true
      }
    }

    let checkData = check?.filter(res => res.isCheck == true)
    if (checkData?.length == check?.length) {
      this.selectData[index].isCheckAll = true
    }
    else {
      this.selectData[index].isCheckAll = false
    }
  }

  togglePanel(panel: MatExpansionPanel) {
    if (panel.expanded) {
      panel.close();
    } else {
      panel.open();
    }
  }

  mouseEnter(selection: SelectItem, i: number) {
    let data = selection.checks
    if (data == undefined) {
      this.selectData[i].isHovered = false
    }
    else {
      this.selectData[i].isHovered = true
    }
  }

  // onItemDropped(event: CdkDragDrop<string[]>, i: number) {
  //   if (event.previousContainer === event.container) {
  //     // Move within the same list
  //     console.log(event.previousIndex, event.currentIndex)
  //     let data: CheckItem[] = this.selectData[i]?.checks || [];
  //     moveItemInArray(data, event.previousIndex, event.currentIndex);
  //   } else {
  //     console.log('fff')
  //     // Move between lists
  //     // transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  //   }
  // }

  onItemDropped(event: any, listIndex: number) {
    if (event.previousContainer !== event.container) {
      console.log('different')
      // Item was dropped into a different list
      const item = event.item.data;
      const sourceIndex = event.previousIndex;
      const targetIndex = event.currentIndex;

      // Remove the item from the source list
      const sourceList = this.selectData.find((_, index) => index === listIndex);
      if (sourceList && sourceList.checks) {
        sourceList.checks.splice(sourceIndex, 1);
      }

      // Insert the item into the target list
      const targetListIndex = this.connectedLists.indexOf(event.container.id);
      if (targetListIndex >= 0) {
        const targetList = this.selectData[targetListIndex];
        if (targetList && targetList.checks) {
          targetList.checks.splice(targetIndex, 0, item);
        }
      }
    } else {
      let data: CheckItem[] = this.selectData[listIndex]?.checks || [];
      moveItemInArray(data, event.previousIndex, event.currentIndex);
    }
  }

}
