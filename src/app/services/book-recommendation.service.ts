import { Injectable } from '@angular/core';

interface Book {
  title: string;
  author_name: string[];
  cover_i: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookRecommendationService {

  // Método para obtener recomendaciones usando fetch
  getRecommendations(): Promise<Book[]> {
    return fetch('https://openlibrary.org/search.json?q=programming')
      .then((response) => response.json())
      .then((data) => data.docs || [])
      .catch((error) => {
        console.error('Error al obtener los libros', error);
        return [];
      });
  }
}
