import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenBlogsComponent } from './choosen-blogs.component';

describe('ChoosenBlogsComponent', () => {
  let component: ChoosenBlogsComponent;
  let fixture: ComponentFixture<ChoosenBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosenBlogsComponent]
    });
    fixture = TestBed.createComponent(ChoosenBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
