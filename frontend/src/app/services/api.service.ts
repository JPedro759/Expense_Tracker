import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://localhost:44373/api/Transaction';

  #http = inject(HttpClient);

  upsertTransaction(transaction: Transaction): Observable<Transaction> {
    return this.#http.post<Transaction>(`${this.baseUrl}/Upsert`, transaction);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.#http.get<Transaction[]>(`${this.baseUrl}/GetAll`);
  }
}
