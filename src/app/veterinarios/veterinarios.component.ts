import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Veterinario } from '../model/Veterinario';
import { VeterinarioService } from '../service/veterinario.service';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.css']
})
export class VeterinariosComponent {
  titulo: string='Listado de Veterinarios';

  listaDeVeterinarios: Veterinario[] = [];

  constructor (private veterinarioService: VeterinarioService){}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.veterinarioService
    .mostrarVeterinarios()
    .subscribe(
      (lasVeterinarios) => (this.listaDeVeterinarios = lasVeterinarios)
    );
  }

  /* [
    {
      idVeterinario: 1,
      nombreVeterinario: 'Deportes',
      descripcionVeterinario: 'Articulos deportivos'
    },
    {
      idVeterinario: 4,
      nombreVeterinario: 'Deportes',
      descripcionVeterinario: 'Articulos deportivos'
    }
  ]; */

  delete(veterinario: Veterinario): void{
    this.veterinarioService.eliminarVeterinario(veterinario.idVeterinario)
        .subscribe((response) => 
          this.veterinarioService
            .mostrarVeterinarios()
            .subscribe(
              (lasVeterinarios) => (this.listaDeVeterinarios=lasVeterinarios)
            )
        );
  }

}
