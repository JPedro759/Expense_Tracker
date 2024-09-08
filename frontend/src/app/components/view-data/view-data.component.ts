import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MonthlyTransactions } from '../../interfaces/monthly_transactions.interface';
import { MonthNamePipe } from '../../pipes/month-name.pipe';
import { ExpTableComponent } from '../exp-table/exp-table.component';

@Component({
  selector: 'view-data',
  standalone: true,
  imports: [MaterialModule, MonthNamePipe, ExpTableComponent],
  templateUrl: './view-data.component.html',
  styleUrl: './view-data.component.scss',
})
export default class ViewDataComponent {
  data: MonthlyTransactions[] = [
    {
      year: 2018,
      month: 7,
      transactions: [
        {
          id: 1,
          date: new Date(2018, 7, 12),
          description: 'Food',
          amount: 7000,
          type: 'DEBIT',
          createdOn: new Date(),
        },
      ],
    },
    {
      year: 2021,
      month: 5,
      transactions: [
        {
          id: 2,
          date: new Date(2021, 5, 22),
          description: 'Food',
          amount: 3000,
          type: 'CREDIT',
          createdOn: new Date(),
        },
      ],
    },
    {
      year: 2024,
      month: 4,
      transactions: [
        {
          id: 3,
          date: new Date(2020, 4, 1),
          description: 'Food',
          amount: 5000,
          type: 'CREDIT',
          createdOn: new Date(),
        },
      ],
    },
  ];

  getEarnings(year: number, month: number) {
    return (
      this.data
        .find((item) => item.year === year && item.month === month)
        ?.transactions.filter((t) => t.type === 'CREDIT')
        .reduce((total, current) => total + current.amount, 0) || 0
    );
  }

  getExpenditure(year: number, month: number) {
    return (
      this.data
        .find((item) => item.year === year && item.month === month)
        ?.transactions.filter((t) => t.type === 'DEBIT')
        .reduce((total, current) => total + current.amount, 0) || 0
    );
  }

  getSavings(year: number, month: number): number {
    const earnings = this.getEarnings(year, month);
    const expenditure = this.getExpenditure(year, month);
    const previousSavings = this.getPreviousSavings(year, month);

    return earnings - expenditure + previousSavings;
  }

  getPreviousSavings(year: number, month: number): number {
    let minYear = Math.min(...this.data.map((d) => d.year));
    let minMonth = Math.min(
      ...this.data.filter((d) => d.year === minYear).map((d) => d.month)
    );

    if (year === minYear && month === minMonth) return 0;

    let prevYearMonth = this.getPreviousYearMonth(year, month);

    return this.getSavings(prevYearMonth.year, prevYearMonth.month);
  }

  getPreviousYearMonth(year: number, month: number) {
    if (month > 0) return { year: year, month: --month };

    return { year: --year, month: 11 };
  }
}
