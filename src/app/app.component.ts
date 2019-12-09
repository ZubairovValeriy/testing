import { Component } from '@angular/core';
import {ManagingPopupsService} from './managing-popups.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {FormBuilder, Validators} from '@angular/forms';
import {FirebaseAuth, FirebaseStorage} from '@angular/fire';
import {StatementMapper} from './new-statement/StatementMapper';
import {AngularFireDatabase} from '@angular/fire/database';
import {StatementStatesService} from './statement-states.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm;
  continueStatementForm;

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

  get isStatementHidden() {
    return this.popupsService.isStatementHidden;
  }

  get isFindStatementHidden() {
    return this.popupsService.isFindStatementHidden;
  }

  get isStatementSubmittedHidden() {
    return this.popupsService.isStatementSubmittedHidden;
  }
  get isStatementRejectReasonHidden() {
    return this.popupsService.isStatementRejectReasonHidden;
  }

  get isContinueStatementHidden() {
    return this.popupsService.isContinueStatementHidden;
  }

  constructor(private popupsService: ManagingPopupsService,
              private db: AngularFireDatabase,
              private router: Router,
              private afAuth: AngularFireAuth,
              private st: StatementStatesService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.continueStatementForm = this.formBuilder.group({
      statementId: ['', [Validators.required]]
    });
  }

  continueStatement() {
    const statementMapper = new StatementMapper(this.db, this.storage);
    console.log(statementMapper.getStatementById(this.continueStatementForm.value.statementId));
    this.popupsService.hidePopups();
    this.router.navigateByUrl('/newStatementStudent');
  }

  logIn() {
    this.afAuth.auth.signInWithEmailAndPassword('ValeriyIU5-12@yandex.ru', 'qwerty123')
      .then(() => {
        this.popupsService.hidePopups();
        this.router.navigateByUrl('/employeeMain');
      })
      .catch((error) => {
        // Handle Errors here.
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
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('/');
      });
  }


  openLoginForm() {
    this.popupsService.isLoginFormHidden = false;
  }

  findStatement() {
    this.popupsService.hidePopups();
    this.router.navigateByUrl('/check');
  }

  hidePopupsAndMasks() {
    this.popupsService.hidePopups();
  }


}


