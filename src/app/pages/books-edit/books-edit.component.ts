import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/books.service';
import { Books } from '../../models/books';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {
  books: Books = {} as Books;
  bookId: string | null = null;
  alertMessage: string = '';
  alertClass: string = '';
  showAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.books = book as Books;
      });
    }
  }

  updateBook(): void {
    const updatedBook: Partial<Books> = {
      title: this.books.title,
      author: this.books.author,
      description: this.books.description,
      cover: this.books.cover,
      price: this.books.price,
      pages: this.books.pages
    };

    if (this.bookId) {
      this.bookService.updateBookById(this.bookId, updatedBook)
        .then(() => {
          this.alertMessage = 'Libro actualizado exitosamente';
          this.alertClass = 'success';
          this.showAlert = true;
        })
        .catch((error) => {
          this.alertMessage = 'Error al actualizar el libro';
          this.alertClass = 'danger';
          this.showAlert = true;
          console.error('Error al actualizar el libro:', error);
        });
    } else {
      this.alertMessage = 'ID del libro no es válido';
      this.alertClass = 'danger';
      this.showAlert = true;
    }
  }
}
