import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statement-table-item',
  templateUrl: './statement-table-item.component.html',
  styleUrls: ['./statement-table-item.component.css']
})

export class StatementTableItemComponent implements OnInit {
  @Input() statement;
  constructor() { }

  ngOnInit() {
  }

}
