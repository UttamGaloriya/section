import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMatListComponent } from './share-mat-list.component';

describe('ShareMatListComponent', () => {
  let component: ShareMatListComponent;
  let fixture: ComponentFixture<ShareMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareMatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
