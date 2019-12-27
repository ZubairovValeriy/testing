import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MaskComponent} from './mask/mask.component';
import {RouterModule, Routes} from '@angular/router';
import {ActionComponent} from './action/action.component';
import {CheckStatementComponent} from './check-statement/check-statement.component';
import {EmployeeComponent} from './employee/employee.component';
import {NewStatementComponent} from './new-statement/new-statement.component';
import {ManagingPopupsService} from './managing-popups.service';
import {EmployeeStatementsComponent} from './employee-statements/employee-statements.component';
import {StatementTableItemComponent} from './statement-table-item/statement-table-item.component';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';

const appRoutes: Routes = [
  {path: '', component: ActionComponent},
  {path: 'main', component: ActionComponent},
  {path: 'check', component: CheckStatementComponent},
  {path: 'newStatementStudent', component: NewStatementComponent},
  {path: 'employeeMain', component: EmployeeComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'employeeStatements', component: EmployeeStatementsComponent, canActivate: [AngularFireAuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    MaskComponent,
    ActionComponent,
    CheckStatementComponent,
    EmployeeComponent,
    NewStatementComponent,
    EmployeeStatementsComponent,
    StatementTableItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    CommonModule
  ],
  providers: [ManagingPopupsService, AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
