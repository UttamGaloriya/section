import { Component } from '@angular/core';
import { selectData } from '../../shared/interface/select-item';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  selectData = [
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
      name: 'Test 12',
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
      name: 'Test 13',
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
      name: 'Test 14',
      orderNumber: 4,
      id: 'a11',
    }
  ]

}
