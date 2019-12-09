import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-statement-foreign',
  templateUrl: './new-statement-foreign.component.html',
  styleUrls: ['./new-statement-foreign.component.css']
})
export class NewStatementForeignComponent implements OnInit {
  statementForm;
  constructor(private formBuilder: FormBuilder) {
    this.statementForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      nameEmployee: ['', [Validators.required]],
      passportData: ['', [Validators.required]],
      position: ['', [Validators.required]],
      emailEmployee: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

}
