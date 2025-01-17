import { Injectable } from '@angular/core';
import { Prodotto } from '../types/prodotto.type';
import { BehaviorSubject } from 'rxjs';

// Tipo definito per ogni prodotto nel carrello, che include il prodotto e la sua quantità
export type ProdottoCarrello = {
  prodotto: Prodotto, // Il prodotto che viene aggiunto al carrello
  quantita: number // La quantità del prodotto nel carrello
}

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  //CODICE FUNZIONANTE SENZA PULSANTE ELIMINA:

  // ProdottiDelCarrello: ProdottoCarrello[] = [];

  // aggiungi(prodotto: Prodotto): void {
  //   let ProdottoDelCarrello = this.ProdottiDelCarrello.find(p => p.prodotto.id === prodotto.id);

  //   if (ProdottoDelCarrello) {
  //     ProdottoDelCarrello.quantita++;
  //   } else {
  //     this.ProdottiDelCarrello.push({ prodotto, quantita: 1 });
  //   }
  // }

  // rimuovi(prodotto: ProdottoCarrello): void {
  //   if (prodotto.quantita > 1) {
  //     prodotto.quantita--;
  //   }
  //   else {
  //     this.ProdottiDelCarrello.splice(this.ProdottiDelCarrello.indexOf(prodotto), 1);
  //     //this.prodottiNelCarrello = this.prodottiNelCarrello.filter(p => p != prodotto);
  //   }
  // }

  // public getQuantitaProdottiCarrello(): number {
  //   return this.ProdottiDelCarrello.reduce((acc: any, p: { quantita: any; }) => acc + p.quantita, 0);
  //   /*let somma = 0;
  //   this.prodottiNelCarrello.forEach(p => somma += p.quantita);
  //   return somma;*/
  // }

  // Creazione di un BehaviorSubject che tiene traccia dei prodotti nel carrello. È un tipo di Observable che memorizza l'ultimo valore emesso, permettendo ai componenti di abbonarsi e ricevere sempre l'ultimo stato.
  private prodottiDelCarrelloSubject = new BehaviorSubject<ProdottoCarrello[]>([]);
  // Observable che espone i prodotti del carrello, per essere osservato dai componenti
  prodottiDelCarrello$ = this.prodottiDelCarrelloSubject.asObservable();

  // Funzione per aggiungere un prodotto al carrello
  aggiungi(prodotto: Prodotto): void {
    // Ottiene il valore corrente dei prodotti nel carrello
    const ProdottiDelCarrello = this.prodottiDelCarrelloSubject.value;
    // Cerca se il prodotto è già presente nel carrello
    const ProdottoDelCarrello = ProdottiDelCarrello.find(p => p.prodotto.id === prodotto.id);

    if (ProdottoDelCarrello) {
      // Se il prodotto è già nel carrello, incrementa la quantità
      ProdottoDelCarrello.quantita++;
    } else {
      // Se il prodotto non è nel carrello, lo aggiunge con una quantità di 1
      ProdottiDelCarrello.push({ prodotto, quantita: 1 });
    }

    // Notifica gli osservatori (componenti) del cambiamento dello stato dei prodotti nel carrello
    this.prodottiDelCarrelloSubject.next(ProdottiDelCarrello);
  }

  // Funzione per rimuovere un prodotto dal carrello (ridurre la quantità)
  rimuovi(prodotto: ProdottoCarrello): void {
    // Ottiene il valore corrente dei prodotti nel carrello
    const ProdottiDelCarrello = this.prodottiDelCarrelloSubject.value;

    if (prodotto.quantita > 1) {
      // Se la quantità del prodotto è maggiore di 1, riduce la quantità
      prodotto.quantita--;
    } else {
      // Se la quantità è 1, rimuove il prodotto dal carrello
      const index = ProdottiDelCarrello.indexOf(prodotto);
      // Rimuove il prodotto dalla lista
      if (index > -1) ProdottiDelCarrello.splice(index, 1);
    }

    // Notifica gli osservatori del cambiamento. La lista dei prodotti nel carrello viene aggiornata utilizzando next().
    this.prodottiDelCarrelloSubject.next(ProdottiDelCarrello);
  }

  // Funzione per eliminare un prodotto dal carrello completamente
  elimina(prodotto: Prodotto): void {
    const ProdottiDelCarrello = this.prodottiDelCarrelloSubject.value.filter(p => p.prodotto.id !== prodotto.id);
    // Rimuove il prodotto dal carrello e aggiorna lo stato
    this.prodottiDelCarrelloSubject.next(ProdottiDelCarrello);
  }

  // Funzione per ottenere la quantità totale di prodotti nel carrello
  public getQuantitaProdottiCarrello(): number {
    // Somma la quantità di tutti i prodotti nel carrello
    return this.prodottiDelCarrelloSubject.value.reduce((acc: any, p: { quantita: any; }) => acc + p.quantita, 0);
  }

  // Funzione per ottenere il totale del valore del carrello (quantità * prezzo del prodotto)
  public getTotaleCarrello(): number {
    // Calcola il totale del carrello moltiplicando la quantità per il prezzo di ciascun prodotto
    return this.prodottiDelCarrelloSubject.value.reduce((acc: any, p: { quantita: any; prodotto: { price: any; }; }) => acc + p.quantita * p.prodotto.price, 0);
  }
}


