import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../types/prodotto.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Iniezione dei servizi necessari
  prodottiService = inject(ProdottiService);
  carrelloService = inject(CarrelloService);

  // Array per memorizzare la lista dei prodotti
  prodotti: Prodotto[] = [];

  // Metodo che viene chiamato quando il componente viene inizializzato
  ngOnInit(): void {
    // Chiamata al servizio per ottenere i prodotti
    this.prodottiService.getProdotto().subscribe(
      // Aggiorna la lista dei prodotti con i dati ricevuti dalla chiamata HTTP
      response => this.prodotti = response
  )};
      
  // Metodo per aggiungere un prodotto al carrello
  aggiungiAlCarrello(prodotto: Prodotto) {
    this.carrelloService.aggiungi(prodotto); // Chiama il servizio per aggiungere il prodotto al carrello
  }

}
