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
  targetItems: any[] = [];
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  edit() {
    console.log("edit");
  }
  selectData: SelectItem[] = [
    {
      name: 'Test 1',
      orderNumber: 4,
      id: 'a11',
      checks: [{
        check: 'check 01',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 14',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 41',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 144',
        orderNumber: 1,
        id: 'aa111'
      }]
    }, {
      name: 'Test 1',
      orderNumber: 4,
      id: 'a11',
      checks: [{
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }]
    },
    {
      name: 'Test 1',
      orderNumber: 4,
      id: 'a11',
      checks: [{
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: 'aa111'
      }]
    }, {
      name: 'Test 1',
      orderNumber: 4,
      id: 'a11',
    }
  ]

  ngOnInit() {
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

  onItemDropped(event: any) {
    console.log(event)
    // moveItemInArray(this.selectData, event.previousIndex, event.currentIndex);
  }


}
