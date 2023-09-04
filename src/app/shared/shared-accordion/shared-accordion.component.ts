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
      this.selectData[index].checks?.map(res => { res.isCheck = true, res.isHovered = true })
    } else {
      this.selectData[index].checks?.map(res => { res.isCheck = false, res.isHovered = false })
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

  mouseleave(selection: SelectItem, i: number) {
    let data = selection.checks;
    if (data == undefined) {
      this.selectData[i].isHovered = false
    } else if (selection.isCheckAll == true) {
      this.selectData[i].isHovered = true
    } else {
      this.selectData[i].isHovered = false
    }
  }


  mouseLeaveList(index: number, indexList: number) {
    let data = this.selectData[index].checks
    if (data !== undefined) {
      if (data[indexList].isCheck == true) {
        data[indexList].isHovered = true
      } else {
        data[indexList].isHovered = false
      }
    }
  }


  onItemDropped(event: any, listIndex: number) {
    console.log(event)
    if (event.previousContainer !== event.container) {
      const item = event.item.data;
      let index = event.container.id
      index = index.charAt(index.length - 1)
      index = parseInt(index)

      let selectIndex = item[1]
      let checkIndex = item[2]
      let checksData = item[0]
      checksData.drop = true
      let checksValue = this.selectData[index].checks
      if (checksValue !== undefined) {
        this.selectData[index].checks?.push(item[0])
        this.selectData[selectIndex].checks?.splice(checkIndex, 1)
      } else {
        this.selectData[index].checks = [item[0]]
      }
    } else {
      let data: CheckItem[] = this.selectData[listIndex]?.checks || [];
      moveItemInArray(data, event.previousIndex, event.currentIndex);
    }
  }

}
