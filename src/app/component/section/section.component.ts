import { Component } from '@angular/core';
import { selectData } from '../../shared/interface/select-item';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
  selectData = [
    {
      name: 'Test 11',
      orderNumber: 1,
      id: this.generateUniqueId(),
      checks: [{
        check: 'check 01',
        orderNumber: 1,
        id: this.generateUniqueId()
      }, {
        check: 'check 2',
        orderNumber: 2,
        id: this.generateUniqueId()
      }, {
        check: 'check 3',
        orderNumber: 3,
        id: this.generateUniqueId()
      }, {
        check: 'check 4',
        orderNumber: 4,
        id: this.generateUniqueId()
      }]
    }, {
      name: 'Test 12',
      orderNumber: 2,
      id: this.generateUniqueId(),
      checks: [{
        check: 'check 5',
        orderNumber: 1,
        id: this.generateUniqueId()
      }, {
        check: 'check 6',
        orderNumber: 2,
        id: this.generateUniqueId()
      }, {
        check: 'check 7',
        orderNumber: 3,
        id: this.generateUniqueId()
      }, {
        check: 'check 8',
        orderNumber: 4,
        id: this.generateUniqueId()
      }]
    },
    {
      name: 'Test 13',
      orderNumber: 3,
      id: this.generateUniqueId(),
      checks: [{
        check: 'check 9',
        orderNumber: 1,
        id: this.generateUniqueId()
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: this.generateUniqueId()
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: this.generateUniqueId()
      }, {
        check: 'check 1',
        orderNumber: 1,
        id: this.generateUniqueId()
      }]
    }, {
      name: 'Test 14',
      orderNumber: 4,
      id: this.generateUniqueId(),
      checks: [{
        check: 'check 1',
        orderNumber: 1,
        id: this.generateUniqueId()
      },]
    }
  ]
  // selectData = [
  //   {
  //     name: 'Test 1',
  //     orderNumber: 4,
  //     id: this.generateUniqueId(),
  //     checks: [{
  //       check: 'check 01',
  //       orderNumber: 1,
  //       id: this.generateUniqueId()
  //     }, {
  //       check: 'check 14',
  //       orderNumber: 1,
  //       id: this.generateUniqueId()
  //     }, {
  //       check: 'check 41',
  //       orderNumber: 1,
  //       id: this.generateUniqueId()
  //     }, {
  //       check: 'check 144',
  //       orderNumber: 1,
  //       id: this.generateUniqueId()
  //     }]
  //   }
  // ]
}
