import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static validDay(yearControlName: string, monthControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const year = control.parent?.get(yearControlName)?.value;
      const month = control.parent?.get(monthControlName)?.value;
      const day = control.value;

      if (year && month && day) {
        const maxDays = new Date(year, month, 0).getDate();

        if (day < 1 || day > maxDays) {
          return { invalidDay: { maxDays } };
        }
      }
      return null;
    };
  }
}
