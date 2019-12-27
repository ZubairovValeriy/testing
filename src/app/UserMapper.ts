import {AngularFireAuth} from '@angular/fire/auth';

export class UserMapper {
  constructor(private afAuth: AngularFireAuth) {
  }

  logIn(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logOut(user) {
    return this.afAuth.auth.signOut();
  }
}
