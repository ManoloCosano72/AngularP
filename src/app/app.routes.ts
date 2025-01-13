import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BooksListComponent} from './pages/books-list/books-list.component';
import {BooksAddComponent} from './pages/books-add/books-add.component';
import {BooksEditComponent } from './pages/books-edit/books-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'books/add', component: BooksAddComponent },
  { path: 'books/edit/:isbn', component: BooksEditComponent }, // Ruta dinámica para editar
  { path: 'books/list', component: BooksListComponent },
  { path: 'books/edit/:id', component: BooksEditComponent },
];

