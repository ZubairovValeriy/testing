import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ManagingPopupsService} from '../managing-popups.service';
import {StatementTableModule} from '../new-statement/StatementTableModule';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {StatementStudent} from '../new-statement/Statement';

@Component({
  selector: 'app-employee-statements',
  templateUrl: './employee-statements.component.html',
  styleUrls: ['./employee-statements.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeStatementsComponent implements OnInit {
  statements: Observable<any[]>;
  url;
  statement?: StatementStudent;
  get isStatementHidden() {
    return this.popupsService.isStatementHidden;
  }

  get getUrl() {
    return this.url;
  }

  getImageUrl(id) {
    const ref = this.storage.ref(id);
    ref.getDownloadURL().subscribe(complete => {
      console.log(complete);
      this.url = complete;
    });
    return this.url;
  }
  get isStatementRejectHidden() {
    return this.popupsService.isStatementRejectReasonHidden;
  }
  constructor(private popupsService: ManagingPopupsService, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    const statementTableModule = new StatementTableModule(db, storage);
    this.statements = statementTableModule.getUnwatchedStatements();
    console.log(this.statements);

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


  ngOnInit() {
  }

  reject() {
    this.popupsService.rejectStatement();
  }

  openStatement(statement) {
    this.statement = statement;
    this.getImageUrl(statement.id);
    this.popupsService.openStatement();
  }
}
