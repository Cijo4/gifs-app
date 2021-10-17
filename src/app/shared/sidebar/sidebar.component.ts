import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{

  constructor(private gifService:GifsService) { }

  miBusqueda:string[]=[];

  get historial(){
    return this.miBusqueda= this.gifService.historial;
  }

  buscar( termino :string){
    this.gifService.buscarGifs( termino );
  }

}
