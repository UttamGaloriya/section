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
  checkedItems: CheckItem[] = [];
  selectedItems: SelectItem[] = []
  constructor(private SnackbarService: SnackbarService) {

  }
  ngOnInit() {
    this.connectedLists = this.selectData.map((list, index) => `list-${index}`);
  }
  ngAfterViewInit() {
    // this.accordion.openAll()

  }
  onCheckboxChange(index: number, selection: SelectItem,) {
    this.selectData[index].isCheckAll = !this.selectData[index].isCheckAll
    let toggle = this.selectData[index].isCheckAll

    if (toggle) {
      this.selectData[index].checks?.map(res => { res.isCheck = true, res.isHovered = true })
      this.checkedItems = this.getUniqueValuesArray(this.checkedItems, this.selectData[index].checks)
    } else {
      this.selectData[index].checks?.map(res => { res.isCheck = false, res.isHovered = false })
      this.checkedItems = this.removeCommonValuesArray(this.checkedItems, this.selectData[index].checks)
    }

    this.toggleItemSelection(this.selectData[index])
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
        this.toggleItemChecked(specificCheck)
      }

      let checkData = check?.filter(res => res.isCheck == true)
      if (checkData?.length == check?.length) {
        this.selectData[index].isCheckAll = true;
        this.selectItemDataAdd(this.selectData[index])
      }
      else {
        this.selectData[index].isCheckAll = false
        this.selectItemDataRemove(this.selectData[index])
      }
    }
  }
  selectItemDataAdd(item: SelectItem) {
    const index = this.selectedItems.findIndex((res => res.id == item.id))
    if (index == -1) {
      this.selectedItems.push(item)
    }
  }

  selectItemDataRemove(item: SelectItem) {
    const index = this.selectedItems.findIndex((res => res.id == item.id))
    if (index >= 0) {
      this.selectedItems.splice(index, 1)
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
    this.selectData[i].isHovered = true
  }

  mouseleave(selection: SelectItem, i: number) {
    if (selection.isCheckAll == true) {
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
    if (this.checkedItems.length <= this.dropLimit) {
      if (event.previousContainer !== event.container) {
        const item = event.item.data;
        let stringId = event.container.id
        let index = parseInt(stringId.replace('list-', ''))
        let selectIndex = item[1]
        let checkIndex = item[2]
        let checksData = item[0]
        checksData.drop = true
        let checksValue = this.selectData[index].checks
        if (this.checkedItems.length == 1) {
          if (checksValue !== undefined) {
            this.selectData[index].checks?.splice(event.currentIndex, 0, checksData)
            this.selectData[selectIndex].checks?.splice(checkIndex, 1)
          } else {
            this.selectData[index].checks = [item[0]]
            this.selectData[selectIndex].checks?.splice(checkIndex, 1)
          }
        } else {
          this.checkedItems.forEach(data => {
            this.dataTransferList(data, index)
          }
          );
        }
      } else {
        let data: CheckItem[] = this.selectData[listIndex]?.checks || [];
        if (this.checkedItems.length = 1) {
          this.swapListData(data, event.previousIndex, event.currentIndex)
        } else {

        }
      }
    } else {
      this.SnackbarService.openSnackBar()
    }
    this.resetValues(this.selectData)
  }

  onItemDroppedAccordion(event: any) {
    if (this.selectedItems.length == 1 || this.selectedItems.length == 0) {
      this.swapListData(this.selectData, event.previousIndex, event.currentIndex)
    } else {
      if (event.currentIndex !== event.previousIndex) {
        this.selectItemDataTransfer(this.selectedItems, event.currentIndex);
      }
    }

    this.resetValues(this.selectData)
  }

  selectItemDataTransfer(data: SelectItem[], index: number) {
    const currentData = this.selectData[index]
    this.selectedItems.forEach((res) => {
      let deleteIndex = this.selectData.findIndex((item) => item.id === res.id)
      console.log(deleteIndex)
      this.selectData.splice(deleteIndex, 1)
    })
    let currentIndex = this.selectData.findIndex((item) => item.id == currentData.id);
    if (currentIndex == -1) {
      this.selectData.push(currentData)
      currentIndex = this.selectData.findIndex((item) => item.id == currentData.id);
    }
    console.log(currentIndex)
    data.forEach((res) => {
      ++currentIndex;
      this.selectData.splice(currentIndex, 0, res)
    })
    this.selectedItems = []
    // console.log(event, this.selectedItems)
  }

  swapListData(data: any, previousIndex: number, currentIndex: number) {
    let tempData = data[previousIndex]
    data[previousIndex] = data[currentIndex]
    data[currentIndex] = tempData

  }

  //multiple item selected
  toggleItemChecked(item: CheckItem) {
    const index = this.checkedItems.indexOf(item);
    if (index === -1) {
      this.checkedItems.push(item);
    } else {
      this.checkedItems.splice(index, 1);
    }
  }


  toggleItemSelection(item: SelectItem) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
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
    this.checkedItems = []
  }

  removeCommonValuesArray(arr1: any, arr2: any) {
    const set2 = new Set(arr2);
    const uniqueArray1 = arr1.filter((value: unknown) => !set2.has(value));
    const uniqueArray2 = arr2.filter((value: unknown) => !set2.has(value));
    return [uniqueArray1];
  }

  getUniqueValuesArray(arr1: any, arr2: any) {
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
