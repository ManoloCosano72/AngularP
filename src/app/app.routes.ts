import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { BooksListComponent } from './pages/books-list/books-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hola-mundo', component: HelloWorldComponent },
  {path : 'books', component: BooksListComponent}
];
