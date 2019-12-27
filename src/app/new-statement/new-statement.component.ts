import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {StatementStudent} from './Statement';
import {ManagingPopupsService} from '../managing-popups.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {StatementTableModule} from './StatementTableModule';

@Component({
  selector: 'app-new-statement',
  templateUrl: './new-statement.component.html',
  styleUrls: ['./new-statement.component.css']
})
export class NewStatementComponent implements OnInit {
  statementForm;
  tableModule: StatementTableModule;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private notificationService: ManagingPopupsService,
              private storage: AngularFireStorage) {
    this.tableModule = new StatementTableModule(db, storage);

    // 364ad615-1368-48d7-bfb2-1e0df0f1d20f -- в процессе рассмотрения
    this.statementForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        middleName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        studentCardNumber: ['', [Validators.required]],
        groupIndex: ['', [Validators.required]],
        beginDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        photoFile: [null, [Validators.required]],
        email: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        reason: ['', [Validators.required]],
      });
  }

  emitFiles(event: FileList) {
    this.statementForm.value.photoFile = event && event.item(0);
    alert(this.statementForm.value.photoFile);
  }

  checkYear(value) {
    if (+value < 2014 || +value > 2019) {
    alert('Не меньше 2014, не больше 2019');
    return false;
    } else {
      return true;
    }
  }

  checkIndex(value) {
    if (value.length < 5 || value.length > 7) {
      console.log('Не меньше 4, не больше 7');
      return false;
    } else {
      return true;
    }
  }

  checkCard(value) {
    if (value.length !== 6) {
      console.log('Не меньше 4, не больше 7');
      return false;
    } else {
      return true;
    }
  }

  saveStatement() {
    const status = 0;

    const studentStatement = new StatementStudent(this.statementForm.value.firstName, this.statementForm.value.middleName,
        this.statementForm.value.lastName, this.statementForm.value.photoFile, this.statementForm.value.email,
        this.statementForm.value.phoneNumber, this.statementForm.value.reason, status, this.statementForm.value.studentCardNumber,
        this.statementForm.value.groupIndex, this.statementForm.value.beginDate, this.statementForm.value.endDate);

    this.tableModule.statements.push(studentStatement);
    this.tableModule.addToDB(studentStatement.id);
    this.notificationService.submitStatement(studentStatement.id, status);
  }

  sendStatement() {
    const status = 1;

    const studentStatement = new StatementStudent(this.statementForm.value.firstName, this.statementForm.value.middleName,
        this.statementForm.value.lastName, this.statementForm.value.photoFile, this.statementForm.value.email,
        this.statementForm.value.phoneNumber, this.statementForm.value.reason, status, this.statementForm.value.studentCardNumber,
        this.statementForm.value.groupIndex, this.statementForm.value.beginDate, this.statementForm.value.endDate);

    this.tableModule.statements.push(studentStatement);
    this.tableModule.addToDB(studentStatement.id);
    this.notificationService.submitStatement(studentStatement.id, status);
  }

}
