import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {StatementStudent} from './Statement';
import {ManagingPopupsService} from '../managing-popups.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {StatementTableModule} from './StatementTableModule';
import {FindStatementServiceService} from '../find-statement-service.service';
import { NewStatementComponent} from './new-statement.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';

describe('NewStatementComponent', () => {
  let component: NewStatementComponent;
  let fixture: ComponentFixture<NewStatementComponent>;

  const FireDB = {};
  const FireSt = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStatementComponent],
      imports: [FormsModule,
        ReactiveFormsModule, AngularFireDatabaseModule],
      providers: [
        { provide: AngularFireDatabase, useValue: FireDB },
        { provide: AngularFireStorage, useValue: FireSt},
        ManagingPopupsService
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Проверка граничных значений для года поступления', () => {

    it('Проверка года поступления 2013', () => {
      const value = 2013;
      expect(component.checkYear(value)).toBeFalsy();
    });

    it('Проверка года поступления 2014', () => {
      const value = 2014;
      expect(component.checkYear(value)).toBeTruthy();
    });

    it('Проверка года поступления 2015', () => {
      const value = 2015;
      expect(component.checkYear(value)).toBeTruthy();
    });

    it('Проверка года поступления 2018', () => {
      const value = 2018;
      expect(component.checkYear(value)).toBeTruthy();
    });

    it('Проверка года поступления 2019', () => {
      const value = 2019;
      expect(component.checkYear(value)).toBeTruthy();
    });

    it('Проверка года поступления 2020', () => {
      const value = 2020;
      expect(component.checkYear(value)).toBeFalsy();
    });
  });

  describe('Проверка длины студенческого билета', () => {
    it('Проверка, когда длина равна 5', () => {
      const value = '5симв';
      expect(component.checkCard(value)).toBeFalsy();
    });

    it('Проверка, когда длина равна 6', () => {
      const value = '6симво';
      expect(component.checkCard(value)).toBeTruthy();
    });

    it('Проверка, когда длина равна 7', () => {
      const value = '7символ';
      expect(component.checkCard(value)).toBeFalsy();
    });
  });

  describe('Проверка длины индекса группы', ()=> {
    it('Проверка, если длина равна 4', () => {
      const value = '1234';
      expect(component.checkIndex(value)).toBeFalsy();
    });

    it('Проверка, если длина равна 5', () => {
      const value = '12345';
      expect(component.checkIndex(value)).toBeTruthy();
    });

    it('Проверка, если длина равна 6', () => {
      const value = '123456';
      expect(component.checkIndex(value)).toBeTruthy();
    });

    it('Проверка, если длина равна 7', () => {
      const value = '1234567';
      expect(component.checkIndex(value)).toBeTruthy();
    });

    it('Проверка, если длина равна 8', () => {
      const value = '12345678';
      expect(component.checkIndex(value)).toBeFalsy();
    });
  });
});
