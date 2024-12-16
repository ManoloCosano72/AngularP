import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hola-mundo', component: HelloWorldComponent }
];
