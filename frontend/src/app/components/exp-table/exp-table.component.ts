import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'exp-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exp-table.component.html',
  styleUrl: './exp-table.component.scss',
})
export class ExpTableComponent implements OnInit {
  @Input() type: 'CREDIT' | 'DEBIT' = 'CREDIT';
  @Input() transactions: Transaction[] = [];

  columns: string[] = ['id', 'date', 'description', 'amount'];
  dataSource = new MatTableDataSource<Transaction>();
  transactionsToDisplay: Transaction[] = [];

  ngOnInit(): void {
    this.transactionsToDisplay = this.transactions.filter(
      (t) => t.type === this.type
    );

    this.dataSource.data = this.transactionsToDisplay;
  }
}
