import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/books.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './books-edit.component.html',
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {
  book = {
    author: '',
    cover: '',
    description: '',
    isbn: '',
    pages: 0,
    price: 0,
    title: ''
  };
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("ID del libro:", this.id); // Verifica que el id sea el esperado
    if (this.id) {
      this.bookService.getBook(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar el libro: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (book) => {
          if (book) {
            this.book = book;
          } else {
            this.alertMessage = `El libro con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      });
    }
  }


  updateBook() {
    console.log("Datos a actualizar:", this.book); // Esto debería mostrar los datos modificados en la consola
    if (this.id && this.book.title && this.book.author && this.book.price && this.book.pages) {
      this.bookService.updateBook(this.id, this.book).then(() => {
        this.alertMessage = `Libro editado correctamente`;
        this.alertClass = "success";
        this.showAlert = true;
      }).catch((error) => {
        console.error('Error al editar el libro:', error);
        this.alertMessage = `Error al editar el libro: ${error.message || error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    } else {
      this.alertMessage = 'Por favor, rellena todos los campos requeridos.';
      this.alertClass = 'danger';
      this.showAlert = true;
    }
  }


}
