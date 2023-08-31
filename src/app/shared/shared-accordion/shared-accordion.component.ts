import { Component, Input, ViewChild } from '@angular/core';
import { SelectItem, selectData } from '../interface/select-item';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-shared-accordion',
  templateUrl: './shared-accordion.component.html',
  styleUrls: ['./shared-accordion.component.scss']
})
export class SharedAccordionComponent {

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
}
