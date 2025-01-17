import { Routes } from '@angular/router';

export const routes: Routes = [
    // La rotta di default, che reindirizza l'utente alla home page
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent), // Carica il componente home in modo lazy
        children: [ { path: ':id', loadComponent: () => import('./components/dettaglio/dettaglio.component').then(m => m.DettaglioComponent) } ] }, // La rotta per il dettaglio di un prodotto
    
    { path: 'carrello', loadComponent: () => import('./components/carrello/carrello.component').then(m => m.CarrelloComponent) },

    // La rotta per la gestione di rotte non trovate (pagina 404)
    { path: '**', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) }

];
