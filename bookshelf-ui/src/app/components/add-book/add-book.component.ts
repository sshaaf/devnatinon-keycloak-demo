import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book.model";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  book: Book = {
    isbn: '',
    title: '',
    genre: '',
    summary: ''
  };
  submitted = false;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      isbn: this.book.isbn,
      title: this.book.title,
      genre: this.book.genre,
      summary: this.book.summary
    };

    this.bookService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });

  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      isbn: '',
      title: '',
      genre: '',
      summary: ''
    };
  }

}
