import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/books.service';
import { Books } from '../../models/books';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";

@Component({
  selector: 'app-books-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './books-edit.component.html',
  styleUrl: './books-edit.component.css'
})
export class BooksEditComponent {
  books: Books = { id: '', isbn: '', title: '', author: '', description: '',cover:'', price: 0,pages: 0};
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private booksService: BookService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      // Obtener los detalles de la empresa desde Firestore
      console.log(this.id);
      this.booksService.getBook(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar el libro: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (books) => {
          if (books) {
            this.books = books;
          } else {
            this.alertMessage = `EL libro con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      });
    }
  }

  updateCompany() {
    if (this.id) {
      this.booksService.updateBook(this.id, this.books).then(() => {
        this.alertMessage = `Libro editado correctamente`;
        this.alertClass = "success";
        this.showAlert = true;
      }).catch((error) => {
        this.alertMessage = `Error al editar el libro: ${error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    }
  }
}
