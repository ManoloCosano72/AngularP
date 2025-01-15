import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Book {
  title: string;
  author_name: string[];
  cover_i: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoading: boolean = true;
  books: Book[] = [];
  currentIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Usar fetch para obtener datos de la API
    fetch('https://openlibrary.org/search.json?q=programming')
      .then((response) => response.json())
      .then((data) => {
        this.books = data.docs || [];
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error al obtener los datos de libros', error);
        this.isLoading = false;
      });
  }

  nextBook(): void {
    if (this.currentIndex < this.books.length - 1) {
      this.currentIndex++;
    }
  }

  previousBook(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
