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
  accordionDrag: boolean = false
  accordionToggle: boolean = false
  dropLimit: number = 3;
  dragActive: boolean = false
  checkedItems: CheckItem[] = [];
  selectedItems: SelectItem[] = [];
  accordionOpen: boolean = false
  undoOpen: boolean = false;
  dragStart: boolean = false;
  panelValid: boolean = false
  dragIndex: any = {
    panelNumber: -1,
    listNumber: -1
  };
  constructor(private SnackbarService: SnackbarService) {

  }
  ngOnInit() {
    this.connectedLists = this.selectData.map((list, index) => `list-${index}`);
  }

  ngAfterViewInit() {
    this.selectData.map(res => res.isExpand = false)
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


  togglePanel(panel: MatExpansionPanel, index: number, selection: SelectItem) {
    if (panel.expanded) {
      panel.close();
    } else {
      panel.open();
    }
    this.onCheckboxChange(index, selection)
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
    // console.log(event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex, event, event.previousContainer !== event.container)
    this.tempSelectItem = JSON.parse(JSON.stringify(this.selectData))
    if (this.checkedItems.length <= this.dropLimit) {
      if (event.previousContainer !== event.container) {
        const item = event.item.data;
        let stringId = event.container.id
        let index = parseInt(stringId.replace('list-', ''))
        let selectIndex = item[1]
        let checkIndex = item[2]
        let checksData: CheckItem = item[0]
        checksData.isCurrentAdd = true

        let checksValue = this.selectData[index].checks
        if (this.checkedItems.length == 1 || this.checkedItems.length == 0) {
          if (checksValue !== undefined) {
            this.selectData[index].checks?.splice(event.currentIndex, 0, checksData)
            this.selectData[selectIndex].checks?.splice(checkIndex, 1)
          } else {
            this.selectData[index].checks = [item[0]]
            this.selectData[selectIndex].checks?.splice(checkIndex, 1)
          }
        } else {
          this.checkedItems.forEach(data => {
            data.isCurrentAdd = true
            this.dataTransferList(data, index)
          }
          );
        }
      } else {
        let data: CheckItem[] = this.selectData[listIndex]?.checks || [];
        if (this.checkedItems.length == 1) {
          this.swapListData(data, event.previousIndex, event.currentIndex)
        } else {
          let currentIndex = event.currentIndex;
          this.checkedItems.map(res => res.isCurrentAdd = true)
          for (let i = this.checkedItems.length - 1; i >= 0; i--) {
            this.sameAccordionDataTransfer(this.checkedItems[i], currentIndex, listIndex);
          }

        }
      }
    } else {
      this.SnackbarService.openSnackBar()
    }
    this.undoOpen = true
    this.resetValues(this.selectData);
    setTimeout(() => {
      this.undoOpen = false
    }, 3000);
    this.selectData[listIndex].isExpand = true
  }

  onItemDroppedAccordion(event: any) {
    if (this.accordionDrag) {
      this.tempSelectItem = JSON.parse(JSON.stringify(this.selectData))
      if (this.selectedItems.length == 1 || this.selectedItems.length == 0 && (event.previousIndex !== event.currentIndex)) {
        this.selectData[event.previousIndex].isCurrentAdd = true
        console.log(event)
        this.swapListData(this.selectData, event.previousIndex, event.currentIndex)
      } else {
        if (event.currentIndex !== event.previousIndex) {
          this.selectedItems.map(res => res.isCurrentAdd = true)
          this.selectItemDataTransfer(this.selectedItems, event.currentIndex);
        }
      }
      this.resetValues(this.selectData)
      this.undoOpen = true
      setTimeout(() => {
        this.undoOpen = false
      }, 3000);
    }
    this.accordionDrag = false
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
      this.selectData.splice(currentIndex, 0, res)
      currentIndex++;
    })
    this.selectedItems = []
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

  //error
  sameAccordionDataTransfer(data: CheckItem, selectIndex: number, listIndex: number) {
    console.log(selectIndex)
    let tempData = this.selectData[listIndex].checks
    let currentData: CheckItem
    if (tempData !== undefined) {
      currentData = tempData[selectIndex]
      console.log(currentData)
    }
    const index = this.selectData.findIndex((res) => res.checks?.includes(data));
    if (index !== -1) {
      const checkIndex = this.selectData[index].checks?.indexOf(data);
      if (checkIndex !== -1 && checkIndex !== undefined) {
        this.selectData[index].checks?.splice(checkIndex, 1);
      }
    }

    let currentIndexId = this.selectData[listIndex].checks?.findIndex((res) => res.id = currentData.id) || 0
    this.selectData[listIndex].checks?.splice(currentIndexId, 0, data)
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
      setTimeout(() => {
        item.isCurrentAdd = false
      }, 4000)
      if (item.checks) {
        item.checks.forEach((check) => {
          check.isHovered = false;
          check.isCheck = false
          setTimeout(() => {
            check.isCurrentAdd = false
          }, 4000)
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

  panelOpen(event: Event, i: number) {
    event.stopPropagation();
    this.selectData[i].isExpand = !this.selectData[i].isExpand
  }

  undo() {
    console.log(this.selectData, this.tempSelectItem)
  }
  tempDataUpdate(data: any) {
    console.log(data)
    this.tempSelectItem = [...data]
  }

  //drag event
  dragEnter(event: CdkDragStart, index: number, listNumber: number) {
    this.dragStart = true
    this.dragIndex.panelNumber = index;
    this.dragIndex.listNumber = listNumber;
    this.accordionDrag = true



  }

  dragEnd(event: any) {
    this.dragStart = false
    this.dragIndex.panelNumber = -1;
    this.dragIndex.listNumber = -1;
    this.accordionDrag = false
  }

  dragAccordionEnter(event: CdkDragStart, i: number) {
    this.accordionDrag = true
    this.dragIndex.panelNumber = i
  }

  dragAccordionEnd(event: any) {
    this.dragIndex.panelNumber = -1
    this.accordionDrag = this.panelValid
  }
  dragMove(event: any) {
  }

  checkLength(check: any) {
    return true
  }

  undoData() {
    this.resetValues(this.tempSelectItem);
    this.selectData = this.tempSelectItem;
    this.undoOpen = false
  }

  accordionToggleButton() {
    if (this.accordionToggle) {
      this.selectData.map(res => res.isExpand = false)
    } else {
      this.selectData.map(res => res.isExpand = true)
    }
    this.accordionToggle = !this.accordionToggle
  }

  mouseEventEnter(i: number) {
    this.selectData[i].isHeaderHover = true
    this.panelValid = true
  }
  mouseEventLeave(i: number) {
    this.selectData[i].isHeaderHover = false
    this.panelValid = false
  }
}
