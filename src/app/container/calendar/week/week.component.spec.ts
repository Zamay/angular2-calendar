import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksComponent } from './week.component';

describe('MonthComponent', () => {
  let component: WeeksComponent;
  let fixture: ComponentFixture<WeeksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
