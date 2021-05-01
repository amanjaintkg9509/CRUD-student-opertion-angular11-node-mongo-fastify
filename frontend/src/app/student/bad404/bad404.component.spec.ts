import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bad404Component } from './bad404.component';

describe('Bad404Component', () => {
  let component: Bad404Component;
  let fixture: ComponentFixture<Bad404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bad404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bad404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
