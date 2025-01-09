import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BookService} from '../../services/books.service';
import {Books} from '../../models/books';
import { NotificationComponent } from '../../components/notification/notification.component';


@Component({
  selector: 'app-books-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './books-add.component.html',
  styleUrl: './books-add.component.css',
})
export class BooksAddComponent {
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";
  booksForm = new FormGroup({
    id: new FormControl(''),
    isbn: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    cover: new FormControl(''),
    price: new FormControl(''),
    pages: new FormControl(''),
  });

  constructor(private booksService: BookService) {
  }

  submitBooks() {
    let newBook: Books = {
      id: this.booksForm.value.id ?? "",
      isbn: this.booksForm.value.isbn ?? "",
      title: this.booksForm.value.title ?? "",
      author: this.booksForm.value.author ?? "",
      description: this.booksForm.value.description ?? "",
      cover: this.booksForm.value.cover ?? "",
      price: this.booksForm.value.price ?? "",
      pages: this.booksForm.value.pages ?? ""
    }
    this.booksService.addBook(newBook).then(()=>{
      this.alertMessage = `Añadida empresa ${this.booksForm.value.id}`;
      this.alertClass = "success";
      this.showAlert = true;
      this.booksForm.reset();
    }).catch((error) => {
      this.alertMessage = `Error al añadir empresa ${this.booksForm.value.id}: ${error}`;
      this.alertClass = "danger";
      this.showAlert = true;
    });
  }
}
