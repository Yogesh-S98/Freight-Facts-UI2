import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() config: any = {};
  @Input() responseData: any;
  @Output() actionHappens = new EventEmitter();
  columns: object[] = [];
  records: object[] = [];
  ngOnInit() {
    this.columns = this.config.columns;
    this.records = this.responseData;
  }
  actionData(row: any, action: any): any {
    if (!action.func) {
      return action;
    }
    return action.func(row, action);
  }
  actionClick(type: string, data: any): void {
    this.actionHappens.emit({ type, data });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responseData'] && changes['responseData'].currentValue) {
      this.records = this.responseData;
    }
    if (changes['config'] && changes['config'].currentValue) {
      this.columns = this.config.columns;
    }
  }
}