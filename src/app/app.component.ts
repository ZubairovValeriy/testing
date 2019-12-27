import {Component} from '@angular/core';
import {ManagingPopupsService} from './managing-popups.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {StatementTableModule} from './new-statement/StatementTableModule';
import {FindStatementServiceService} from './find-statement-service.service';
import {UserTableModule} from './UserTableModule';
import {User} from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm;
  continueStatementForm;
  checkStatusForm;
  tableModule: StatementTableModule;
  userTableModule: UserTableModule;

  get submitText() {
    if (this.popupsService.status === 1) {
      return 'Вы можете отследить заявление по данному номеру';
    }
    if (this.popupsService.status === 0) {
      return 'Вы можете продолжить заполнение заявления по этому номеру';
    }
  }

  get isMaskHidden() {
    return this.popupsService.isMaskHidden;
  }

  get isLoginFormHidden() {
    return this.popupsService.isLoginFormHidden;
  }

  get isFindStatementHidden() {
    return this.popupsService.isFindStatementHidden;
  }

  get isStatementSubmittedHidden() {
    return this.popupsService.isStatementSubmittedHidden;
  }

  get isContinueStatementHidden() {
    return this.popupsService.isContinueStatementHidden;
  }

  constructor(private popupsService: ManagingPopupsService,
              private db: AngularFireDatabase,
              private router: Router,
              private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private findStatementService: FindStatementServiceService,
              private storage: AngularFireStorage) {
    this.tableModule = new StatementTableModule(db, storage);
    this.userTableModule = new UserTableModule(afAuth);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.continueStatementForm = this.formBuilder.group({
      statementId: ['', [Validators.required]]
    });

    this.checkStatusForm = this.formBuilder.group({
      statementId: ['', [Validators.required]]
    });
  }

  logIn() {
    const user = new User(this.loginForm.value.email, this.loginForm.value.password);

    this.userTableModule.logIn(user)
      .then(() => {
        this.userTableModule.user = user;
        this.popupsService.hidePopups();
        this.router.navigateByUrl('/employeeMain');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  logOut() {
    this.userTableModule.logOut().then(() => {
      this.router.navigateByUrl('/');
    });
  }

  closePopup() {
    this.popupsService.hidePopups();
  }


  openLoginForm() {
    this.popupsService.isLoginFormHidden = false;
  }

  findStatement() {
    this.popupsService.hidePopups();
    this.tableModule.getStatementByID(this.checkStatusForm.value.statementId)
      .then((snapshot) => {
        const statement = snapshot.val();
        if (statement) {
          this.findStatementService.setStatement(statement);
          this.router.navigateByUrl('/check');
        } else {
          alert('Не нашли');
        }
      })
      .catch(error => console.log(error));
  }

  hidePopupsAndMasks() {
    this.popupsService.hidePopups();
  }
}


