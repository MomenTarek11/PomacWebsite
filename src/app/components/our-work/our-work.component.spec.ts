import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OurWorkComponent } from './our-work.component';

describe('OurWorkComponent', () => {
  let component: OurWorkComponent;
  let fixture: ComponentFixture<OurWorkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OurWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
