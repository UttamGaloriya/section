import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAccordionComponent } from './shared-accordion.component';

describe('SharedAccordionComponent', () => {
  let component: SharedAccordionComponent;
  let fixture: ComponentFixture<SharedAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
