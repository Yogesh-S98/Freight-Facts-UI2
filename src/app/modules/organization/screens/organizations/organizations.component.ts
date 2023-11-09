import { Component, OnInit } from '@angular/core';
import { listConfig, organizationList } from './listConfig';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  tableConfig: object = listConfig;
  tableData: organizationList[] = [];
  ngOnInit(): void {
    this.tableData = [
      { id: 1, name: 'aadadf', code: 'adfas', contactEmail: 'addfd@yopmail.com', organizationType: 'carrier'   },
      { id: 2, name: 'aadadf', code: 'adfas', contactEmail: 'addfd@yopmail.com', organizationType: 'carrier'   }
    ]
  }
  actionFromTable(value): void {
  
    switch (value.type) {
      case 'createConfig':
        console.log('create');
        return;
      case 'edit':
        console.log('edit');
        return;
    }
  }
}
