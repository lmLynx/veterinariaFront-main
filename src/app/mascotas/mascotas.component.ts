import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MascotaService } from '../service/mascota.service';
import { Mascota } from '../model/Mascota';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {
  titulo: string='Listado de Mascotas';

  listaDeMascotas: Mascota[] = [];

  constructor (private mascotaService: MascotaService){}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.mascotaService
    .mostrarMascotas()
    .subscribe(
      (lasMascotas) => (this.listaDeMascotas = lasMascotas)
    );
  }

  /* [
    {
      idMascota: 1,
      nombreMascota: 'Deportes',
      descripcionMascota: 'Articulos deportivos'
    },
    {
      idMascota: 4,
      nombreMascota: 'Deportes',
      descripcionMascota: 'Articulos deportivos'
    }
  ]; */

  delete(mascota: Mascota): void{
    this.mascotaService.eliminarMascota(mascota.idMascota)
        .subscribe((response) => 
          this.mascotaService
            .mostrarMascotas()
            .subscribe(
              (lasMascotas) => (this.listaDeMascotas=lasMascotas)
            )
        );
  }
}
