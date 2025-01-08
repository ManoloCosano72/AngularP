import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/books.service';
import { Books } from '../../models/books';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Books[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBooks(id: string): void {
    this.bookService.deleteBook(id);
  }
}
