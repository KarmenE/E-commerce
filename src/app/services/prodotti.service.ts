import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotto } from '../types/prodotto.type';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  // Inietta HttpClient nel costruttore per fare richieste HTTP
  constructor(private http: HttpClient) { }

  // La base URL per l'API dei prodotti
  private baseUrl = 'https://fakestoreapi.com';

  // Metodo per ottenere tutti i prodotti dall'API. Questo metodo restituisce un Observable<Prodotto[]>, che è la risposta alla richiesta HTTP GET per ottenere tutti i prodotti dall'API.
  getProdotto(): Observable<Prodotto[]> {
    // Fa una richiesta GET per ottenere l'elenco dei prodotti dall'API
    return this.http.get<Prodotto[]>(`${this.baseUrl}/products`); 
  }

  // Metodo per ottenere un prodotto specifico in base al suo ID
  getProdottoById(id: number): Observable<Prodotto> {
    // Fa una richiesta GET per ottenere il prodotto con l'ID specificato dall'API
    return this.http.get<Prodotto>(`${this.baseUrl}/products/${id}`);
  }

}
