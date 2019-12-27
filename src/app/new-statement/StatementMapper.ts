import {AngularFireDatabase} from '@angular/fire/database';
import {StatementStudent} from './Statement';
import {AngularFireStorage} from '@angular/fire/storage';

export class StatementStudentMapper {
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  insert(statement: StatementStudent) {
    const file = statement.photo;
    const filePath = 'images/' + statement.id;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    this.db.object(`statements/${statement.id}`).set(
      {
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
      }
    );
  }

  update(statement) {
    this.db.object(`statements/${statement.id}`).update(
      {
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
        endGradeDate: statement.endGradeDate,
        rejectReason: statement.rejectReason
      }
    );
  }

  async getStatementById(id: string) {
    const ref = this.db.database.ref(`statements`).child(`${id}`);
    return ref.once('value');
  }

  getSentStatements() {
    return this.db.list('statements', ref => ref.orderByChild('status').equalTo(1))
      .valueChanges();
  }

}
