/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaskComponent } from './mask.component';

describe('MaskComponent', () => {
  let component: MaskComponent;
  let fixture: ComponentFixture<MaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
