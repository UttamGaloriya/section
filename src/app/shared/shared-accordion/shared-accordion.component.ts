import { Component, Input, ViewChild, EventEmitter } from '@angular/core';
import { CheckItem, SelectItem, selectData } from '../interface/select-item';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-shared-accordion',
  templateUrl: './shared-accordion.component.html',
  styleUrls: ['./shared-accordion.component.scss']
})
export class SharedAccordionComponent {
  @Input() selectData: SelectItem[] = []
  tempSelectItem: SelectItem[] = []
  targetItems: any[] = [];
  connectedLists: string[] = []
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  dropLimit: number = 3;
  dragActive: boolean = false
  selectedItems: any[] = [];
  constructor(private SnackbarService: SnackbarService) {

  }
  ngOnInit() {
    this.connectedLists = this.selectData.map((list, index) => `list-${index}`);
  }
  ngAfterViewInit() {
    this.accordion.openAll()

  }
  onCheckboxChange(index: number, selection: SelectItem,) {


    this.selectData[index].isCheckAll = !this.selectData[index].isCheckAll
    let toggle = this.selectData[index].isCheckAll
    if (toggle) {
      this.selectData[index].checks?.map(res => { res.isCheck = true, res.isHovered = true })
      this.selectedItems = this.getUniqueValues(this.selectedItems, this.selectData[index].checks)

    } else {
      this.selectData[index].checks?.map(res => { res.isCheck = false, res.isHovered = false })
      this.selectedItems = this.removeCommonValues(this.selectedItems, this.selectData[index].checks)
    }
  }

  onCheckboxListChange(selection: SelectItem, index: number, checkNumber: number) {
    if (this.selectData.length !== 1) {
      let check = this.selectData[index]?.checks
      if (check != undefined) {
        let specificCheck = check[checkNumber] ?? [];
        if (specificCheck.isCheck) {
          specificCheck.isCheck = !specificCheck.check
        } else {
          specificCheck.isCheck = true
        }
        this.toggleItemSelection(specificCheck)
      }

      let checkData = check?.filter(res => res.isCheck == true)
      if (checkData?.length == check?.length) {
        this.selectData[index].isCheckAll = true
      }
      else {
        this.selectData[index].isCheckAll = false
      }
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
    if (data == undefined || data.length == 0) {
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
    if (this.selectedItems.length <= this.dropLimit) {
      if (event.previousContainer !== event.container) {
        console.log(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,)

        const item = event.item.data;
        let stringId = event.container.id
        let index = parseInt(stringId.replace('list-', ''))
        let selectIndex = item[1]
        let checkIndex = item[2]
        let checksData = item[0]
        checksData.drop = true
        let checksValue = this.selectData[index].checks
        if (this.selectedItems.length == 1) {
          if (checksValue !== undefined) {
            this.selectData[index].checks?.splice(event.currentIndex, 0, checksData)
            this.selectData[selectIndex].checks?.splice(checkIndex, 1)
          } else {
            this.selectData[index].checks = [item[0]]
            this.selectData[selectIndex].checks?.splice(checkIndex, 1)
          }
        } else {
          this.selectedItems.forEach(data => {
            this.dataTransferList(data, index)
          });

        }
      } else {
        let data: CheckItem[] = this.selectData[listIndex]?.checks || [];
        this.swapListData(data, event.previousIndex, event.currentIndex)
      }
    } else {
      this.SnackbarService.openSnackBar()
    }

  }

  onItemDroppedAccordion(event: any) {
    this.swapListData(this.selectData, event.previousIndex, event.currentIndex)
  }

  swapListData(data: any, previousIndex: number, currentIndex: number) {
    let tempData = data[previousIndex]
    data[previousIndex] = data[currentIndex]
    data[currentIndex] = tempData
  }

  //multiple item selected
  toggleItemSelection(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }

    console.log(this.tempSelectItem)
  }

  dataTransferList(data: CheckItem, selectIndex: number) {
    data.isCurrentAdd = true
    const index = this.selectData.findIndex((res) => res.checks?.includes(data));
    if (index !== -1) {
      const checkIndex = this.selectData[index].checks?.indexOf(data);
      if (checkIndex !== -1 && checkIndex !== undefined) {
        this.selectData[index].checks?.splice(checkIndex, 1);
      }
    }
    let selectValue = this.selectData[selectIndex].checks
    if (selectValue !== undefined) {
      this.selectData[selectIndex].checks?.push(data)
    } else {
      let temp = []
      temp.push(data)
      this.selectData[selectIndex].checks = temp
    }
  }

  resetValues(dataArray: SelectItem[]) {
    dataArray.forEach((item) => {
      item.isHovered = false;
      item.isCheckAll = false;
      if (item.checks) {
        item.checks.forEach((check) => {
          check.isHovered = false;
          check.isCheck = false
          check.isCurrentAdd = false
        });
      }
    });
    this.selectedItems = []
  }

  removeCommonValues(arr1: any, arr2: any) {
    const set2 = new Set(arr2);
    const uniqueArray1 = arr1.filter((value: unknown) => !set2.has(value));
    const uniqueArray2 = arr2.filter((value: unknown) => !set2.has(value));
    return [uniqueArray1];
  }

  getUniqueValues(arr1: any, arr2: any) {
    const combinedArray = [...arr1, ...arr2];
    const uniqueValues = new Set(combinedArray);
    const uniqueArray = Array.from(uniqueValues);
    return uniqueArray;
  }

  handleButtonClick(event: Event) {
    event.stopPropagation();
  }

  undo() {
    console.log(this.selectData, this.tempSelectItem)
  }
  tempDataUpdate(data: any) {
    console.log(data)
    this.tempSelectItem = [...data]
  }

  //drag event
  dragEnter(event: CdkDragStart, index: number) {
    console.log("start")
    this.selectData[index].isDragStart = true
    console.log(this.selectData[index].isDragStart)
  }
  dragEnd(event: CdkDragEnd, index: number) {
    console.log("end")
    this.selectData[index].isDragStart = false
    console.log(this.selectData[index].isDragStart)
  }



}
