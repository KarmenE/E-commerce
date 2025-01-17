//NON CANCELLARE :

// import { Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { ProdottiService } from '../../services/prodotti.service';
// import { Prodotto } from '../../types/prodotto.type';

// @Component({
//   selector: 'app-dettaglio',
//   templateUrl: './dettaglio.component.html',
//   styleUrl: './dettaglio.component.css'
// })
// export class DettaglioComponent implements OnInit {

//   activatedRoute = inject(ActivatedRoute);
//   prodottiService = inject(ProdottiService);

//   prodotto: Prodotto | undefined;

//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe((params: Params) => {
//       this.prodottiService.getProdottoById(params['id']).subscribe(
//         response => this.prodotto = response
//       )
//     });
//   }

// }

// In app.config.ts avevo inserito provideRouter(routes, withComponentInputBinding()), poi il parametro nel dettaglio l'ho preso con l'oggetto activatedRoute. Avendo inserito quell'opzione potevo prendere il parametro tramte @Input ed aggiornare l'id in arrivo dalla rotta con ngOnChanges, quindi ho modificato il codice come di seguito: 
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Prodotto } from '../../types/prodotto.type';
import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-dettaglio',
  standalone: true,
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent implements OnChanges {
  // Input decorator che permette di ricevere l'ID del prodotto come parametro dal componente genitore
  @Input() id!: string; // Riceve l'ID come parametro dalla rotta

  // Iniezione del servizio ProdottiService
  prodottiService = inject(ProdottiService);
  // Variabile per salvare i dettagli del prodotto corrente
  prodotto: Prodotto | undefined;

  // Metodo lifecycle che si attiva ogni volta che cambia il valore delle proprietà con @Input
  ngOnChanges(changes: SimpleChanges): void {
    // Controlla se l'ID è cambiato e carica i dettagli del prodotto
    if (changes['id'] && changes['id'].currentValue) {
      this.caricaProdotto(changes['id'].currentValue);
    }
  }

  // private caricaProdotto(id: string): void {
  //   this.prodottiService.getProdottoById(id).subscribe(
  //     response => (this.prodotto = response)
  //   );
  // }

  // siccome nel metodo caricaProdotto sopra mi dava errore sull'id perché si aspetta un parametro di tipo number e invece io passo una stringa, ho modificato il metodo che adesso converte l'id passato dalla rotta in un numero prima di chiamare getProdottoById: 
  // Metodo privato per caricare i dettagli di un prodotto dato il suo ID
  private caricaProdotto(id: string): void {
    const idNumber = Number(id); // Converte la stringa in numero
    if (!isNaN(idNumber)) { // Controlla che la conversione abbia successo
      this.prodottiService.getProdottoById(idNumber).subscribe(
        response => (this.prodotto = response) // Aggiorna la variabile prodotto con i dettagli ricevuti
      );
    } else {
      console.error(`Invalid ID: ${id}`); // Mostra un errore nel caso in cui l'ID non sia valido
    }
  }
  
}
