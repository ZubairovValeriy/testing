import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ManagingPopupsService} from '../managing-popups.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private popupsServise: ManagingPopupsService) {
}

  checkStatus() {
    this.popupsServise.checkStatus();
  }

  continueStatement() {
    this.popupsServise.continueStatement();
  }

  ngOnInit() {
  }

}
