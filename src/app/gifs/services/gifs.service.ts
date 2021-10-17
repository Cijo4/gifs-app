import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'VoIZUad9brgvOmgJQoKsu0NScrOBFZCR';

  private _historial: string[] = [];

  public resultados:Gif[]=[];

  get historial() {
    // De esta forma no modifica el arreglo original
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query: string ='' ) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);

      // De esta manera limitamos el array que se muestra a 10
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem( 'historial', JSON.stringify(this._historial) );
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=VoIZUad9brgvOmgJQoKsu0NScrOBFZCR&q=${ query }&limit=10`
      )
      .subscribe( ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ))
      });
  }
}
