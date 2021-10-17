import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'VoIZUad9brgvOmgJQoKsu0NScrOBFZCR';

  private _historial: string[] = [];

  public resultados:any[]=[];

  get historial() {
    // De esta forma no modifica el arreglo original
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string ='' ) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);

      // De esta manera limitamos el array que se muestra a 10
      this._historial = this._historial.splice(0, 10);
    }

    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=VoIZUad9brgvOmgJQoKsu0NScrOBFZCR&q=${ query }&limit=10`
      )
      .subscribe( (resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
