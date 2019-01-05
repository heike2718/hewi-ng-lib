import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HewiNgLibComponent } from './hewi-ng-lib.component';

describe('HewiNgLibComponent', () => {
  let component: HewiNgLibComponent;
  let fixture: ComponentFixture<HewiNgLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HewiNgLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HewiNgLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
