import { Injectable } from '@angular/core';
import {StatementStudent} from './new-statement/Statement';

@Injectable({
  providedIn: 'root'
})
export class StatementStatesService {
  statement: StatementStudent;

  constructor() { }
}
