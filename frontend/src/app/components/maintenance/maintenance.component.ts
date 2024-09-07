import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CustomValidators } from '../../validators/CustomValidators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMsgComponent } from '../confirm-msg/confirm-msg.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from '../../interfaces/transaction.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'maintenance',
  standalone: true,
  imports: [MaterialModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export default class MaintenanceComponent implements OnInit {
  years: number[] = [];
  months: { index: number; name: string }[] = [];

  #fb = inject(FormBuilder);
  #dialog = inject(MatDialog);
  #snackBar = inject(MatSnackBar);
  #apiService = inject(ApiService);

  transactionForm: FormGroup = this.#fb.group({
    id: [0],
    year: [null, Validators.required],
    month: [null, Validators.required],
    day: [
      null,
      [Validators.required, CustomValidators.validDay('year', 'month')],
    ],
    description: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    type: [null, Validators.required],
  });

  dataSource = new MatTableDataSource<Transaction>();

  columns = [
    'id',
    'date',
    'description',
    'amount',
    'type',
    'createdOn',
    'delete',
  ];

  constructor() {
    let year = new Date();

    for (let i = 0; i <= 10; i++) {
      this.years.push(year.getFullYear() - i);
    }

    for (let i = 1; i <= 12; i++) {
      this.months.push({
        index: i,
        name: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
          new Date(0, i - 1, 1)
        ),
      });
    }
  }

  ngOnInit(): void {
    this.transactionForm
      .get('year')
      ?.valueChanges.subscribe(() =>
        this.transactionForm.get('day')?.updateValueAndValidity()
      );

    this.transactionForm
      .get('month')
      ?.valueChanges.subscribe(() =>
        this.transactionForm.get('day')?.updateValueAndValidity()
      );

    this.#apiService.getAllTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.dataSource.data = transactions;
      },
    })
  }

  insertForm() {
    const { id, year, month, day, description, amount, type } =
      this.transactionForm.value;

    let transaction = {
      id,
      date: new Date(year, month, day),
      description,
      amount,
      type,
      createdOn: new Date(),
    };

    this.#apiService.upsertTransaction(transaction).subscribe({
      next: (res: Transaction) => {
        this.transactionForm.reset();
        this.dataSource.data = [res, ...this.dataSource.data];
      },
    });
  }

  editTransaction(transaction: Transaction) {
    this.dataSource.data = this.dataSource.data.filter(
      (v) => v.id != transaction.id
    );

    this.transactionForm.patchValue({
      id: transaction.id,
      year: transaction.date.getFullYear(),
      month: transaction.date.getMonth(),
      day: transaction.date.getDate(),
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
    });
  }

  deleteTransation() {
    let msgRef = this.#dialog.open(ConfirmMsgComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'This will delete the transaction. Are you sure?',
      },
    });

    msgRef.afterClosed().subscribe({
      next: (res: boolean) => {
        if (res) this.#snackBar.open('Item Deleted!');
      },
    });
  }
}
