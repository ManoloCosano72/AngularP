import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/books.service';
import { Books } from '../../models/books';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Books[] = [];
  isLoading: boolean = true; // Para gestionar el estado de carga
  isEmpty: boolean = false;  // Para verificar si la lista está vacía

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // Método para cargar los libros
  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
        this.isLoading = false; // Datos cargados, ya no estamos cargando
        this.isEmpty = this.books.length === 0; // Si la lista está vacía
      },
      (error) => {
        console.error('Error al cargar los libros:', error);
        this.isLoading = false; // En caso de error, dejamos de mostrar el spinner
      }
    );
  }

  // Método para eliminar un libro
  deleteBook(id: string) {
    this.bookService.deleteBook(id).then(() => {
      // Eliminar el libro de la lista
      this.books = this.books.filter((book) => book.id !== id);
    }).catch((error) => {
      // Mostrar un mensaje de error
      console.error('Error al eliminar el libro:', error);
    });
  }

  // Método para actualizar un libro
  updateBook(id: string, updatedData: Partial<Books>) {
    if (!id) {
      console.error('Error: No se puede actualizar un libro sin ID.');
      return;
    }

    this.bookService.updateBook(id, updatedData)
      .then(() => {
        // Actualizar el libro en la lista local
        this.books = this.books.map((book) =>
          book.id === id ? { ...book, ...updatedData } : book
        );
        console.log(`Libro con ID ${id} actualizado correctamente.`);
      })
      .catch((error) => {
        // Mostrar un mensaje de error
        console.error('Error al actualizar el libro:', error);
      });
  }
}
