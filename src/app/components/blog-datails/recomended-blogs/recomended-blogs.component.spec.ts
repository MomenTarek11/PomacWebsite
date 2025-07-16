import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedBlogsComponent } from './recomended-blogs.component';

describe('RecomendedBlogsComponent', () => {
  let component: RecomendedBlogsComponent;
  let fixture: ComponentFixture<RecomendedBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendedBlogsComponent]
    });
    fixture = TestBed.createComponent(RecomendedBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
