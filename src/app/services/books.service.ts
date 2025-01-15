import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, deleteDoc, getDoc,query,where,getDocs, CollectionReference, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Books } from '../models/books';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.bookCollection = collection(this.firestore, 'books');
  }

  // Obtener todos los libros
  getBooks(): Observable<Books[]> {
    return collectionData(this.bookCollection, { idField: 'id' }) as Observable<Books[]>;
  }

  // Obtener un libro por ID
  getBook(id: string): Observable<Books> {
    const docRef = doc(this.bookCollection, id);
    return from(getDoc(docRef)).pipe(  // Usamos getDoc() en lugar de getDocs() con query
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { ...docSnapshot.data(), id: docSnapshot.id } as Books;
        } else {
          throw new Error('No se encontró ningún libro con el ID especificado.');
        }
      })
    );
  }

  // Agregar un nuevo libro
  addBook(book: Books): Promise<void> {
    return addDoc(this.bookCollection, book) as unknown as Promise<void>;
  }

  updateBook(id: string, book: Partial<Books>): Promise<void> {
    const docRef = doc(this.bookCollection, id);
    console.log("Actualizando documento con id:", id, "y datos:", book); // Añade un log aquí
    return updateDoc(docRef, book);
  }


  // Eliminar un libro por ID
  deleteBook(id: string): Promise<void> {
    const docRef = doc(this.bookCollection, id);
    return deleteDoc(docRef);
  }

  async checkIsbnExists(isbn: string): Promise<boolean> {
    try {
      // Crear la referencia a la colección de libros
      const booksCollection = collection(this.firestore, 'books');

      // Crear la consulta con el filtro de ISBN
      const booksQuery = query(booksCollection, where('isbn', '==', isbn));

      // Ejecutar la consulta
      const querySnapshot = await getDocs(booksQuery);

      // Si hay resultados, el ISBN ya existe
      return !querySnapshot.empty; // Si no está vacío, el ISBN ya existe
    } catch (error) {
      console.error('Error al comprobar el ISBN:', error);
      throw new Error('Error al comprobar el ISBN');
    }
  }


}
