import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})
export class CustomerlistComponent implements OnChanges {
  Customer: any[] = [
    {
      Id: 1,
      Title: 'Mr',
      First_Name: 'John',
      Last_Name: 'Doe',
      Email: 'john.doe@gmail.com',
      Phone: '9876543210',
      Customer_Type: 'Premium',
    },
    {
      Id: 2,
      Title: 'Mr',
      First_Name: 'Jane',
      Last_Name: 'Smith',
      Email: 'jane.smith@gmail.com',
      Phone: '9123456780',
      Customer_Type: 'Premium',
    },
    {
      Id: 3,
      Title: 'Mr',
      First_Name: 'Alan',
      Last_Name: 'Grant',
      Email: 'alan.grant@gmail.com',
      Phone: '9012345678',
      Customer_Type: 'Standard',
    },
    {
      Id: 4,
      Title: 'Ms',
      First_Name: 'Ellie',
      Last_Name: 'Sattler',
      Email: 'ellie.sattler@gmail.com',
      Phone: '9988776655',
      Customer_Type: 'Standard',
    },
  ];
  tempstore: any[] = [];
  @Input() data: any;
  @Input() filter: any;
  @Input() filterautocomplete: any;
  constructor(private appcomponent: AppComponent) {
    this.filter = 'All';
    this.tempstore = this.Customer;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['data']?.currentValue;
    this.filter = changes['filter']?.currentValue;
    this.filterautocomplete = changes['filterautocomplete']?.currentValue;
    if (this.data?.method == 'Add') {
      this.data.formdata.Id = this.Customer?.length + 1;
      this.Customer.push(this.data.formdata);
      this.tempstore.push(this.data.formdata);
    } else if (this.data?.method == 'Edit') {
      const cindex = this.Customer.findIndex(
        (x: any) => x.Id === this.data.formdata.Id
      );
      const tindex = this.tempstore.findIndex(
        (x: any) => x.Id === this.data.formdata.Id
      );
      if (cindex !== -1) {
        this.Customer.splice(cindex, 1, this.data.formdata);
      }
      if (tindex !== -1) {
        this.tempstore.splice(tindex, 1, this.data.formdata);
      }
    } else if (this.data?.method == 'Delete') {
      const cindex = this.Customer.findIndex(
        (x: any) => x.Id === this.data.formdata.Id
      );
      if (cindex !== -1) {
        this.Customer.splice(cindex, 1);
      }
      const tindex = this.tempstore.findIndex(
        (x: any) => x.Id === this.data.formdata.Id
      );
      if (tindex !== -1) {
        this.tempstore.splice(tindex, 1);
      }
    }
    if (this.filter != undefined) {
      if (this.filter == 'All') {
        console.log(this.filter);
        console.log(this.tempstore);
        this.Customer = this.tempstore;
      } else {
        console.log(this.filter);
        this.Customer = this.tempstore.filter(
          (c) => c.Customer_Type == this.filter
        );
      }
    }
  }

  popup(method: any, data: any) {
    this.appcomponent.popup(method, data);
  }
}
