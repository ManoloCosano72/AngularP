import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, docData, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Books } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.bookCollection = collection(this.firestore, 'books'); // Cambiar 'companies' por 'books'
  }

  // Obtener todos los libros
  getBooks(): Observable<Books[]> {
    return collectionData(this.bookCollection, { idField: 'id' }) as Observable<Books[]>;
  }

  // Obtener un libro por ID
  getBook(id: string): Observable<Books | undefined> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return docData(bookDocRef) as Observable<Books | undefined>;
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
  deleteBook(id: string): Promise<void> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return deleteDoc(bookDocRef) as Promise<void>;
  }
}
