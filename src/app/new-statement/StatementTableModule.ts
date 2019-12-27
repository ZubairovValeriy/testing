import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {StatementStudentMapper} from './StatementMapper';

export class StatementTableModule {
  statements = [];

  studentMapper: StatementStudentMapper;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.studentMapper = new StatementStudentMapper(db, storage);
  }

  addToDB(id) {
    const statement = this.getStatement(id);
    this.studentMapper.insert(statement);
  }

  async getStatementByID(id) {
    const statement = this.studentMapper.getStatementById(id);
    return statement;
  }

  deleteFromStatements(id) {
    const statement = this.getStatement(id);
    this.statements.splice(this.statements.indexOf(statement), 1);
  }

  addRejectReason(id, reason) {
    const statement = this.getStatement(id);
    statement.rejectReason = reason;
    statement.status = 4;
  }

  changeStatement(id, value) {
    const statement = this.getStatement(id);
    statement.firstName = value.firstName;
    statement.middleName = value.middleName;
    statement.lastName = value.lastName;
    statement.beginGradDate = value.beginDate;
    statement.endGradeDate = value.endDate;
    statement.studentCardNumber = value.studentCardNumber;
    statement.photo = value.photoFile;
    statement.groupIndex = value.groupIndex;
    statement.reason = value.reason;
    statement.email = value.email;
  }

  getStatement(id) {
    return this.statements.find(element =>
      element.id === id
    );
  }

  getStatements() {
    return this.studentMapper.getSentStatements();
  }

  changeStatus(id, status) {
    const statement = this.getStatement(id);
    statement.status = status;
  }

  updateDB(id) {
    const statement = this.getStatement(id);
    this.studentMapper.update(statement);
  }
}
