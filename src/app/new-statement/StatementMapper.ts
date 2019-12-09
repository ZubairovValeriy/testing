import {StatementTableModule} from './StatementTableModule';
import {AngularFireDatabase} from '@angular/fire/database';
import {StatementStudent} from './Statement';
import {AngularFireStorage} from '@angular/fire/storage';

export class StatementMapper {
  statementTableModule: StatementTableModule;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.statementTableModule = new StatementTableModule(db, storage);
  }

  getStatementById(id) {
    // const resultData = this.statementTableModule.getStatementByID(id);
    // return new StatementStudent(
    //   resultData.firstName, resultData.middleName, resultData.lastName, resultData.photo,
    //   resultData.email, resultData.phoneNumber, resultData.reason, resultData.status,
    //   resultData.studentCardNumber, resultData.groupIndex, resultData.beginGradDate, resultData.endGradeDate);
  }

  insert(statement: StatementStudent) {
    const data = {
      id: statement.id,
      status: statement.status,
      firstName: statement.firstName,
      middleName: statement.middleName,
      lastName: statement.lastName,
      photo: statement.photo,
      email: statement.email,
      phoneNumber: statement.phoneNumber,
      reason: statement.reason,
      groupIndex: statement.groupIndex,
      studentCardNumber: statement.studentCardNumber,
      beginGradDate: statement.beginGradDate,
      endGradeDate: statement.endGradeDate
    };

    console.log(data);

    this.statementTableModule.insert(data);

  }
}
