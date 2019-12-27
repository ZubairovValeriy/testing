import {Injectable} from '@angular/core';
import {StatementStudent} from './new-statement/Statement';

@Injectable({
  providedIn: 'root'
})
export class FindStatementServiceService {
  statement: StatementStudent;

  constructor() {
  }

  setStatement(statement) {
    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }
}
