import { Component } from '@angular/core';
import { selectData } from '../../shared/interface/select-item';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  selectData = selectData
}
