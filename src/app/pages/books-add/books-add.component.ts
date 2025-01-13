import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/books.service';
import { Books } from '../../models/books';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-books-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css'], // Corregido "styleUrl" a "styleUrls"
})
export class BooksAddComponent {
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";
  booksForm = new FormGroup({
    isbn: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    cover: new FormControl(''),
    price: new FormControl(''),
    pages: new FormControl(''),
  });

  constructor(private booksService: BookService) {}

  // Validación asincrónica del ISBN
  validateIsbn(): Promise<boolean> {
    const isbn = this.booksForm.value.isbn;
    return new Promise((resolve) => {
      if (isbn) {
        this.booksService.getBookByIsbn(isbn).subscribe({
          next: (books) => {
            if (books.length > 0) {
              this.booksForm.controls['isbn'].setErrors({ isbnExists: true });
              resolve(true); // ISBN ya existe
            } else {
              resolve(false); // ISBN es único
            }
          },
          error: () => resolve(false), // En caso de error asumimos que el ISBN no existe
        });
      } else {
        resolve(false); // Si no hay ISBN en el formulario
      }
    });
  }

  // Envío del formulario con validación de ISBN
  async submitBooks() {
    const isbnExists = await this.validateIsbn();
    if (isbnExists) {
      this.alertMessage = 'El ISBN ya está en uso. No se puede añadir el libro.';
      this.alertClass = 'danger';
      this.showAlert = true;
      return; // Detener el proceso si el ISBN ya existe
    }

    const newBook: Books = {
      isbn: this.booksForm.value.isbn ?? "",
      title: this.booksForm.value.title ?? "",
      author: this.booksForm.value.author ?? "",
      description: this.booksForm.value.description ?? "",
      cover: this.booksForm.value.cover ?? "",
      price: Number(this.booksForm.value.price) ?? 0,
      pages: Number(this.booksForm.value.pages) ?? 0,
    };

    this.booksService.addBook(newBook).then(() => {
      this.alertMessage = `Libro añadido: ${this.booksForm.value.isbn}`;
      this.alertClass = "success";
      this.showAlert = true;
      this.booksForm.reset();
    }).catch((error) => {
      this.alertMessage = `Error al añadir el libro ${this.booksForm.value.isbn}: ${error}`;
      this.alertClass = "danger";
      this.showAlert = true;
    });
  }
}
