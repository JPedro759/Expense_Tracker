import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: true,
})
export class MonthNamePipe implements PipeTransform {
  private static readonly monthNames: string[] = Array.from(
    { length: 12 },
    (_, i) =>
      new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, i))
  );

  transform(monthIndex: number): string {
    const { monthNames } = MonthNamePipe;

    return monthIndex >= 0 && monthIndex <= 11
      ? monthNames[monthIndex]
      : 'Invalid Month!';
  }
}
