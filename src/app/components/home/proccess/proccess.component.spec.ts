import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProccessComponent } from './proccess.component';

describe('ProccessComponent', () => {
  let component: ProccessComponent;
  let fixture: ComponentFixture<ProccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProccessComponent]
    });
    fixture = TestBed.createComponent(ProccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
