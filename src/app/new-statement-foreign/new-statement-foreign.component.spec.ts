/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewStatementForeignComponent } from './new-statement-foreign.component';

describe('NewStatementForeignComponent', () => {
  let component: NewStatementForeignComponent;
  let fixture: ComponentFixture<NewStatementForeignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStatementForeignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStatementForeignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
