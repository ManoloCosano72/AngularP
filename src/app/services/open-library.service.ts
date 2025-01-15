import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenLibraryService {
  private baseUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search.json?q=${query}`);
  }

  getBookByISBN(isbn: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/isbn/${isbn}.json`);
  }

  getBookCover(coverId: number, size: string = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}
