import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private Matdialog: MatDialog) {}
  title = 'customer';
  selectedType: string = 'All';
  value = '';
  customerform: any;

  popup(method: any, data: any) {
    const Matdialogref = this.Matdialog.open(addcustomer, {
      disableClose: true,
      width: '400px',
      data: { method: method, data: data },
    });

    Matdialogref.afterClosed().subscribe((res: any) => {
      this.customerform = res;
    });
  }
  
}

@Component({
  selector: 'addcustomer',
  templateUrl: './addcustomer.html',
  styleUrls: ['./app.component.css'],
})
export class addcustomer implements OnInit {
  method: any;
  CustomerForm = this.formbuilder.group({
    Id: [0],
    Title: ['', Validators.required],
    First_Name: ['', Validators.required],
    Last_Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    Customer_Type: ['', Validators.required],
  });

  constructor(
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AppComponent>
  ) {}
  ngOnInit(): void {
    this.method = this.data.method;

    if (this.data.data) {
      this.CustomerForm.patchValue({ ...this.data.data });
    }
  }

  submit(method: any) {
    if (this.CustomerForm.invalid) {
      alert('Form is Invalid');
    } else {
      this.dialogRef.close({
        method: method,
        formdata: this.CustomerForm.value,
      });
    }
  }
}
