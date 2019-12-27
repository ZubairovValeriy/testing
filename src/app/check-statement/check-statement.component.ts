import {Component, OnInit} from '@angular/core';
import {FindStatementServiceService} from '../find-statement-service.service';
import {StatementStudent} from '../new-statement/Statement';

@Component({
  selector: 'app-check-statement',
  templateUrl: './check-statement.component.html',
  styleUrls: ['./check-statement.component.css']
})
export class CheckStatementComponent implements OnInit {
  statement: StatementStudent;

  constructor(private statementService: FindStatementServiceService) {
    this.statement = statementService.getStatement();
  }

  getName() {
    return this.statement.middleName + ' ' + this.statement.firstName + ' ' + this.statement.lastName;
  }

  getStatus() {
    switch (this.statement.status) {
      case 0:
        return 'Сохранено, не отправлено';
      case 1:
        return 'Отправлено';
      case 2:
        return 'На рассмотрении';
      case 3:
        return 'Одобрено';
      case 4:
        return 'Отказ';
    }
    return this.statement.status;
  }

  getRejectReason() {
    if (this.statement.status === 4) {
      return this.statement.rejectReason;
    }
  }

}
