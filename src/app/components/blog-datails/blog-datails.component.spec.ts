import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDatailsComponent } from './blog-datails.component';

describe('BlogDatailsComponent', () => {
  let component: BlogDatailsComponent;
  let fixture: ComponentFixture<BlogDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDatailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
