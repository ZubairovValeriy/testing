import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {StatementStudent} from './Statement';
import {ManagingPopupsService} from '../managing-popups.service';
import {StatementMapper} from './StatementMapper';
import {StatementStatesService} from '../statement-states.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-new-statement',
  templateUrl: './new-statement.component.html',
  styleUrls: ['./new-statement.component.css']
})
export class NewStatementComponent implements OnInit {
  statementForm;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private notificationService: ManagingPopupsService,
              private st: StatementStatesService, private storage: AngularFireStorage) {
    if (st.statement) {
      this.statementForm = this.formBuilder.group({
        firstName: [st.statement.firstName, [Validators.required]],
        middleName: [st.statement.middleName, [Validators.required]],
        lastName: [st.statement.lastName, [Validators.required]],
        studentCardNumber: [st.statement.studentCardNumber, [Validators.required]],
        groupIndex: [st.statement.groupIndex, [Validators.required]],
        beginDate: [st.statement.beginGradDate, [Validators.required]],
        endDate: [st.statement.endGradeDate, [Validators.required]],
        photoFile: [st.statement.photo, [Validators.required]],
        email: [st.statement.email, [Validators.required]],
        phoneNumber: [st.statement.phoneNumber, [Validators.required]],
        reason: [st.statement.reason, [Validators.required]],
      });
    } else {
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
  }

  emitFiles(event: FileList ) {
    this.statementForm.value.photoFile = event && event.item(0);
  }

  saveStatement() {
    const status = 0;

    const studentStatement = new StatementStudent(this.statementForm.value.firstName, this.statementForm.value.middleName,
      this.statementForm.value.lastName, this.statementForm.value.photoFile, this.statementForm.value.email,
      this.statementForm.value.phoneNumber, this.statementForm.value.reason, status, this.statementForm.value.studentCardNumber,
      this.statementForm.value.groupIndex, this.statementForm.value.beginDate, this.statementForm.value.endDate);

    console.log(this.statementForm.value);
    console.log(studentStatement);
    const statementMapper = new StatementMapper(this.db, this.storage);
    statementMapper.insert(studentStatement);
    this.notificationService.submitStatement(studentStatement.id, status);
  }

  sendStatement() {
    const status = 1;

    const studentStatement = new StatementStudent(this.statementForm.value.firstName, this.statementForm.value.middleName,
      this.statementForm.value.lastName, this.statementForm.value.photoFile, this.statementForm.value.email,
      this.statementForm.value.phoneNumber, this.statementForm.value.reason, status, this.statementForm.value.studentCardNumber,
      this.statementForm.value.groupIndex, this.statementForm.value.beginDate, this.statementForm.value.endDate);

    this.notificationService.submitStatement(studentStatement.id, status);
    console.log(this.statementForm);
    console.log(this.statementForm.photoFile);
  }

  ngOnInit() {
  }

}
