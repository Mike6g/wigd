/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeadsComponent } from './deads.component';

describe('DeadsComponent', () => {
  let component: DeadsComponent;
  let fixture: ComponentFixture<DeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
