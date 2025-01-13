import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  updateDoc,
  doc,
  docData,
  deleteDoc,
  where,
  CollectionReference,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Books } from '../models/books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.bookCollection = collection(this.firestore, 'books');
  }

  // Obtener todos los libros
  getBooks(): Observable<Books[]> {
    return collectionData(this.bookCollection, { idField: 'id' }) as Observable<Books[]>;
  }

  // Obtener un libro por su ID
  getBookById(id: string): Observable<Books | null> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return docData(bookDocRef, { idField: 'id' }) as Observable<Books | null>;
  }

  // Agregar un nuevo libro
  addBook(book: Books): Promise<void> {
    return addDoc(this.bookCollection, book) as unknown as Promise<void>;
  }

  // Actualizar un libro existente
  updateBook(id: string, book: Partial<Books>): Promise<void> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return updateDoc(bookDocRef, book) as Promise<void>;
  }

  // Eliminar un libro
  deleteBook(id: string | undefined): Promise<void> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return deleteDoc(bookDocRef) as Promise<void>;
  }

  // Obtener un libro por ISBN
  getBookByIsbn(isbn: string): Observable<Books[]> {
    const booksQuery = query(this.bookCollection, where('isbn', '==', isbn));
    return collectionData(booksQuery, { idField: 'id' }) as Observable<Books[]>;
  }
  updateBookById(id: string, book: Partial<Books>): Promise<void> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return updateDoc(bookDocRef, book);
  }

}
