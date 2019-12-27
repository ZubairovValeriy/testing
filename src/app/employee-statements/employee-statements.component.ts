import {Component, OnInit} from '@angular/core';
import {ManagingPopupsService} from '../managing-popups.service';
import {StatementTableModule} from '../new-statement/StatementTableModule';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {StatementStudent} from '../new-statement/Statement';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-statements',
  templateUrl: './employee-statements.component.html',
  styleUrls: ['./employee-statements.component.css']
})
export class EmployeeStatementsComponent {
  statements;
  tableModule;
  url;
  statement?: StatementStudent;
  rejectForm;

  get isStatementHidden() {
    return this.popupsService.isStatementHidden;
  }

  get getUrl() {
    return this.url;
  }

  getImageUrl(id) {
    const ref = this.storage.ref(`/images/${id}`);
    ref.getDownloadURL().subscribe(complete => {
      console.log(complete);
      this.url = complete;
    });
    return this.url;
  }

  get isStatementRejectHidden() {
    return this.popupsService.isStatementRejectReasonHidden;
  }

  constructor(private popupsService: ManagingPopupsService,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private storage: AngularFireStorage) {
    this.tableModule = new StatementTableModule(db, storage);
    this.rejectForm = this.fb.group({
      reason: ['', [Validators.required]]
    });

    const st = [];
    this.tableModule.getStatements().subscribe(statements => {
      statements.forEach((value: any) => {
        const newStatement = new StatementStudent(value.firstName, value.middleName, value.lastName, null,
          value.email, value.phoneNumber, value.reason, value.status, value.studentCardNumber, value.groupIndex, value.beginGradDate,
          value.endGradeDate, value.id);
        st.push(newStatement);
      });
      this.tableModule.statements = st;
      this.statements = this.tableModule.statements;
    });
  }

  get firstName() {
    if (this.statement) {
      return this.statement.firstName;
    }
    return '';
  }

  get lastName() {
    if (this.statement) {
      return this.statement.lastName;
    }
    return '';
  }

  get id() {
    if (this.statement) {
      return this.statement.id;
    }
    return '';
  }

  get middleName() {
    if (this.statement) {
      return this.statement.middleName;
    }
    return '';
  }

  get groupIndex() {
    if (this.statement) {
      return this.statement.groupIndex;
    }
    return '';
  }

  get dates() {
    if (this.statement) {
      return this.statement.beginGradDate + ' - ' + this.statement.endGradeDate;
    }
    return '';
  }

  reject() {
    this.popupsService.rejectStatement();
  }

  resolveStatement() {
    this.tableModule.changeStatus(this.statement.id, 3);
    this.tableModule.updateDB(this.statement.id);
    this.tableModule.deleteFromStatements(this.statement.id);
    this.popupsService.hidePopups();
  }

  openStatement(statement) {
    this.statement = this.tableModule.getStatementById(statement.id);
    this.getImageUrl(statement.id);
    this.popupsService.openStatement();
  }

  rejectStatement() {
    const reason = this.rejectForm.value.reason;
    this.tableModule.addRejectReason(this.statement.id, reason);
    this.tableModule.updateDB(this.statement.id);
    this.tableModule.deleteFromStatements(this.statement.id);
  }
}
