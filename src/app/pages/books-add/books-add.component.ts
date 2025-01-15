import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/books.service';
import { Books } from '../../models/books';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css'],
})
export class BookAddComponent {
  showAlert: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';

  // Formulario reactivo para el libro con validaciones
  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    pages: new FormControl(0, [Validators.required, Validators.min(1)]), // Asegura que haya al menos 1 página
    price: new FormControl(0, [Validators.required, Validators.min(0)]), // Asegura que el precio no sea negativo
    cover: new FormControl('', [Validators.required]),
  });

  constructor(private bookService: BookService) {}

  // Método para enviar los datos del formulario
  async submitBook() {
    // Verifica si todos los campos están completos y son válidos
    if (this.bookForm.invalid) {
      this.alertMessage = 'Por favor, completa todos los campos correctamente.';
      this.alertClass = 'danger';
      this.showAlert = true;
      return;
    }

    // Obtén el valor del ISBN
    const isbn = this.bookForm.value.isbn?.trim();
    if (!isbn) {
      this.alertMessage = 'El ISBN es obligatorio.';
      this.alertClass = 'danger';
      this.showAlert = true;
      return;
    }

    // Comprobar si el ISBN ya existe
    const isbnExists = await this.bookService.checkIsbnExists(isbn);
    if (isbnExists) {
      this.alertMessage = 'El ISBN ya está registrado.';
      this.alertClass = 'danger';
      this.showAlert = true;
      return;
    }

    // Creación del objeto "Books" sin incluir un ID (Firestore lo genera automáticamente)
    const newBook: Books = {
      title: this.bookForm.value.title?.trim() ?? '',
      author: this.bookForm.value.author?.trim() ?? '',
      description: this.bookForm.value.description?.trim() ?? '',
      isbn: isbn,
      pages: this.bookForm.value.pages ?? 0,
      price: this.bookForm.value.price ?? 0,
      cover: this.bookForm.value.cover?.trim() ?? '',
    };

    // Agregar el nuevo libro usando el servicio
    this.bookService.addBook(newBook).then(() => {
      // Mostrar mensaje de éxito
      this.alertMessage = `Libro "${this.bookForm.value.title}" añadido correctamente.`;
      this.alertClass = 'success';
      this.showAlert = true;

      // Reiniciar el formulario
      this.bookForm.reset();
    }).catch((error) => {
      // Manejar errores y mostrar un mensaje
      this.alertMessage = `Error al añadir el libro: ${error.message}`;
      this.alertClass = 'danger';
      this.showAlert = true;
    });
  }
}
