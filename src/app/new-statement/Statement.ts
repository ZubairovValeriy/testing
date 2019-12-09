import {v4} from 'uuid';

export class Statement {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  photo: File;
  email: string;
  phoneNumber: string;
  reason: string;
  status: number;

  constructor(firstName: string, middleName: string, lastName: string, photo: File,
              email: string, phoneNumber: string, reason: string, status: number, id?: string, ) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.photo = photo;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.reason = reason;
    this.status = status;
  }
}

export class StatementEmployee extends Statement {
  position: string;
  faculty: string;

  constructor(firstName: string, middleName: string, lastName: string, photo: File,
              email: string, phoneNumber: string, reason: string, status: number,
              position: string, faculty: string, id?: string) {
    super(firstName, middleName, lastName, photo, email, phoneNumber, reason, status, id);
    this.position = position;
    this.faculty = faculty;
  }
}

export class StatementStudent extends Statement {
  studentCardNumber: string;
  groupIndex: string;
  beginGradDate: string;
  endGradeDate: string;

  constructor(firstName: string, middleName: string, lastName: string, photo: File,
              email: string, phoneNumber: string, reason: string, status: number,
              studentCardNumber: string, groupIndex: string, beginDate: string, endGradeDate: string, id?: string) {

    super(firstName, middleName, lastName, photo, email, phoneNumber, reason, status, id);
    this.groupIndex = groupIndex;
    this.studentCardNumber = studentCardNumber;
    this.beginGradDate = beginDate;
    this.endGradeDate = endGradeDate;
  }
}
