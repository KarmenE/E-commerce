import { Component, inject, OnInit } from '@angular/core';
import { CarrelloService, ProdottoCarrello } from '../../services/carrello.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {

  // Array che contiene i prodotti nel carrello
  prodotti: ProdottoCarrello[] = [];

  // Iniezione del servizio CarrelloService
  ProdottoCarrello = inject(CarrelloService);
  // Array di prodotti del carrello, popolato durante l'inizializzazione del componente
  prodottiDelCarrello: ProdottoCarrello[] = [];

  // ngOnInit(): void {
  //   this.prodotti = this.ProdottoCarrello.ProdottiDelCarrello
  // }

  // Costruttore del componente, che riceve il servizio CarrelloService
  constructor(private carrelloService: CarrelloService) {}

  // Metodo lifecycle di Angular che si esegue dopo l'inizializzazione del componente
  ngOnInit(): void {
    // Sottoscrizione all'observable prodottiDelCarrello$ del servizio CarrelloService
    this.carrelloService.prodottiDelCarrello$.subscribe(
      (prodotti) => {
        // Aggiorna l'array dei prodotti quando cambia il carrello
        this.prodottiDelCarrello = prodotti;
        console.log('Prodotti nel carrello:', this.prodottiDelCarrello);
      }
    );
  }

}
