import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BooksListComponent} from './pages/books-list/books-list.component';
import {BookAddComponent} from './pages/books-add/books-add.component';
import {BooksEditComponent } from './pages/books-edit/books-edit.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { AuthGuard } from './guards/auth.guard';
import {NotFoundComponent} from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListComponent, canActivate : [AuthGuard] },
  { path: 'books/add', component: BookAddComponent, canActivate : [AuthGuard] },
  { path: 'books/list', component: BooksListComponent, canActivate : [AuthGuard] },
  { path: 'books/edit/:id', component: BooksEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginGoogleComponent },
  {path: '**', component: NotFoundComponent}

];

