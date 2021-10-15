import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[]=[];

  get historial(){
    //te esta forma no modifica el arreglo original
    return [...this._historial];
  }

  buscarGifs(query:string){
    this._historial.unshift( query );
    console.log(this._historial)
  }

}
