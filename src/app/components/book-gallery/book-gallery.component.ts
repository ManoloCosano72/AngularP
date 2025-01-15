import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BookRecommendationService } from '../../services/book-recommendation.service';

@Component({
  selector: 'app-book-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Importa módulos necesarios
  templateUrl: './book-gallery.component.html',
  styleUrls: ['./book-gallery.component.css'],
})
export class BookGalleryComponent implements OnInit {
  books: any[] = [];
  currentIndex: number = 0;
  isLoading: boolean = true;

  constructor(private bookService: BookRecommendationService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.isLoading = true;
    this.bookService.getRecommendations().subscribe((data) => {
      this.books = data;
      this.isLoading = false;
    });
  }

  nextBook() {
    if (this.books.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.books.length;
    }
  }

  previousBook() {
    if (this.books.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.books.length) % this.books.length;
    }
  }
}
