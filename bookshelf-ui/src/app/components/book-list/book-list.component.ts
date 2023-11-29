import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {BookService} from "../../services/book.service";



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{

  books?: Book[];
  currentBook: Book = {};
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) {
  }


  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAll()
      .subscribe({
        next: (data) => {
          this.books = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }


  refreshList(): void {
    this.getBooks();
    this.currentBook = {};
    this.currentIndex = -1;
  }

  removeAllBooks(): void {
    this.bookService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentBook = {};
    this.currentIndex = -1;

    this.bookService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.books = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
