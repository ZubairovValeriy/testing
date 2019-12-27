import {UserMapper} from './UserMapper';
import {AngularFireAuth} from '@angular/fire/auth';

export class UserTableModule {
  user;
  userMapper: UserMapper;

  constructor(private afAuth: AngularFireAuth) {
    this.userMapper = new UserMapper(afAuth);
  }

  logIn(user) {
    return this.userMapper.logIn(user);
  }

  logOut() {
    return this.userMapper.logOut(this.user);
  }
}
