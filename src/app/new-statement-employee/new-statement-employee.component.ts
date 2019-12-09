import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-statement-employee',
  templateUrl: './new-statement-employee.component.html',
  styleUrls: ['./new-statement-employee.component.css']
})
export class NewStatementEmployeeComponent implements OnInit {
  statementForm;

  constructor(private formBuilder: FormBuilder) {
    this.statementForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      studentCardNumber: ['', [Validators.required]],
      groupIndex: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: ['', [Validators.required]],
      photoFile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

}
