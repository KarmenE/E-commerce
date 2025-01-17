import { Component, inject } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  // Iniezione del servizio CarrelloService per gestire i prodotti nel carrello
  private CarrelloService = inject(CarrelloService);

    //invece di richiamare il metodo getQuantitaProdottiCarrello, mi sottoscrivo all'observable di carrello.service per calcolare la quantità totale:
    // Variabile che tiene traccia della quantità totale di prodotti nel carrello
    quantitaProdottiCarrello: number = 0; 

    constructor() {
      // Sottoscrizione all'osservabile per aggiornare il numero totale di prodotti nel carrello
      this.CarrelloService.prodottiDelCarrello$
        .pipe(
          // Calcola la quantità totale sommando la proprietà `quantita` di ogni prodotto nel carrello
          map(prodotti => prodotti.reduce((acc, p) => acc + p.quantita, 0)) 
        )
        // Aggiorna la variabile locale ogni volta che cambia il contenuto del carrello
        .subscribe(quantita => {
          this.quantitaProdottiCarrello = quantita;
        });
    }

}