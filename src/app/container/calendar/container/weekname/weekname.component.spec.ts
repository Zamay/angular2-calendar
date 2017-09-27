import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeknameComponent } from './weekname.component';

describe('WeeknameComponent', () => {
  let component: WeeknameComponent;
  let fixture: ComponentFixture<WeeknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
