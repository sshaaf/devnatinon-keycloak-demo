import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  @Input() viewMode = false;

  @Input() currentBook: Book = {
    title: '',
    isbn: '',
    genre: '',
    summary: ''
  };

  message = '';
  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router){

  }

  ngOnInit() {
    if (!this.viewMode) {
      this.message = '';
      this.getBook(this.route.snapshot.params["isbn"]);
    }
  }

  getBook(isbn: string): void {
    this.bookService.get(isbn)
      .subscribe({
        next: (data) => {
          this.currentBook = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateBook(): void {
    this.message = '';

    this.bookService.update(this.currentBook.isbn, this.currentBook)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Book was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.isbn)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/books']);
        },
        error: (e) => console.error(e)
      });
  }

}
