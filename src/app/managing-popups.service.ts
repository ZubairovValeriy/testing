import { Injectable } from '@angular/core';

@Injectable()
export class ManagingPopupsService {

  isStatementHidden = true;
  isStatementRejectReasonHidden = true;
  isStatementSubmittedHidden = true;
  isFindStatementHidden = true;
  isLoginFormHidden = true;
  isContinueStatementHidden = true;

  statementId?;
  status?;

  get isMaskHidden() {
    return !(!this.isStatementSubmittedHidden || !this.isLoginFormHidden ||
      !this.isFindStatementHidden || !this.isStatementHidden || !this.isStatementRejectReasonHidden
    || !this.isContinueStatementHidden);
  }

  openLoginForm() {
    this.isLoginFormHidden = false;
  }

  checkStatus() {
    this.isFindStatementHidden = false;
  }

  continueStatement() {
    this.isContinueStatementHidden = false;
  }

  openStatement() {
    this.isStatementHidden = false;
  }

  rejectStatement() {
    this.isStatementRejectReasonHidden = false;
  }

  submitStatement(id, status) {
    this.isStatementSubmittedHidden = false;
    this.statementId = id;
    this.status = status;
  }

  hidePopups() {
    this.isLoginFormHidden = true;
    this.isStatementHidden = true;
    this.isFindStatementHidden = true;
    this.isStatementRejectReasonHidden = true;
    this.isStatementSubmittedHidden = true;
    this.isContinueStatementHidden = true;
  }

  constructor() { }

}
