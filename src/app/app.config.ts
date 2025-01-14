import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';


/**export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideFirebaseApp(() => initializeApp({
    projectId: "angularp-71790",
    appId: "1:103586943212:web:f3e62da8c702f2cc56d5c9",
    storageBucket: "angularp-71790.firebasestorage.app",
    apiKey: "AIzaSyDy74IapTiCp-5-j7g-GAm8O7lbGZw-2pk",
    authDomain: "angularp-71790.firebaseapp.com",
    messagingSenderId: "103586943212"
  })), provideFirestore(() => getFirestore())]
};
 **/
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firestore)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
};
