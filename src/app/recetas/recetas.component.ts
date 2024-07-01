import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecetaService } from '../service/receta.service';
import { Receta } from '../model/Receta';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {
  titulo: string='Listado de Recetas';

  listaDeRecetas: Receta[] = [];

  constructor (private recetaService: RecetaService){}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.recetaService
    .mostrarRecetas()
    .subscribe(
      (lasRecetas) => (this.listaDeRecetas = lasRecetas)
    );
  }

  /* [
    {
      idReceta: 1,
      nombreReceta: 'Deportes',
      descripcionReceta: 'Articulos deportivos'
    },
    {
      idReceta: 4,
      nombreReceta: 'Deportes',
      descripcionReceta: 'Articulos deportivos'
    }
  ]; */

  delete(receta: Receta): void{
    this.recetaService.eliminarReceta(receta.idReceta)
        .subscribe((response) => 
          this.recetaService
            .mostrarRecetas()
            .subscribe(
              (lasRecetas) => (this.listaDeRecetas=lasRecetas)
            )
        );
  }
}
