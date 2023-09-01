import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCheckboxComponent } from './shared-checkbox.component';

describe('SharedCheckboxComponent', () => {
  let component: SharedCheckboxComponent;
  let fixture: ComponentFixture<SharedCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
