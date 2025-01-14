import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BooksListComponent} from './pages/books-list/books-list.component';
import {BooksAddComponent} from './pages/books-add/books-add.component';
import {BooksEditComponent } from './pages/books-edit/books-edit.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListComponent, canActivate : [AuthGuard] },
  { path: 'books/add', component: BooksAddComponent, canActivate : [AuthGuard] },
  { path: 'books/edit/:isbn', component: BooksEditComponent, canActivate : [AuthGuard] }, // Ruta dinámica para editar
  { path: 'books/list', component: BooksListComponent, canActivate : [AuthGuard] },
  { path: 'books/edit/:id', component: BooksEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginGoogleComponent }
];

