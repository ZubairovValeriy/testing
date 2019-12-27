import {Component, OnInit} from '@angular/core';
import {ManagingPopupsService} from '../managing-popups.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private popupsServise: ManagingPopupsService, private router: Router) {
  }

  checkStatus() {
    this.popupsServise.checkStatus();
  }

  continueStatement() {
    this.popupsServise.continueStatement();
  }

  newStatement() {
    this.router.navigateByUrl('newStatementStudent');
  }
}
