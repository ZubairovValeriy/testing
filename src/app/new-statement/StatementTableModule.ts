import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

export class StatementTableModule {
  url;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }
  insert(data) {
    const file = data.photo;
    const filePath = 'images/' + data.id;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    this.db.object(`statements/${data.id}`).set(
      {
        id: data.id,
        status: data.status,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        photo: data.photo,
        email: data.email,
        phoneNumber: data.phoneNumber,
        reason: data.reason,
        groupIndex: data.groupIndex,
        studentCardNumber: data.studentCardNumber,
        beginGradDate: data.beginGradDate,
        endGradeDate: data.endGradeDate
      }
    );
  }

  getStatementByID(id) {
    const ref = this.db.database.ref(`statements`).child(`${id}`);
    ref.once('value')
        .then(  (snapshot) => {
          return snapshot.val();
          console.log('ХУЙ');
        })
        .catch(error => error);
}
  getResolvedStatements() {

  }

  getRejectedStatements() {

  }

  getUnwatchedStatements() {
    return this.db.list('statements').valueChanges();
  }

  changeStatus() {

  }
}
