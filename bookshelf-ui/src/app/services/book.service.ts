import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Book} from "../model/book.model";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.booksApiUrl;
    console.log("API "+this.apiUrl)

  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  get(isbn: any): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${isbn}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(isbn: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${isbn}`, data);
  }

  delete(isbn: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${isbn}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  findByTitle(title: any): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?title=${title}`);
  }
}
