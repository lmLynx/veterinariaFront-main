import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultaService } from '../service/consulta.service';
import { Consulta } from '../model/Consulta';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  titulo: string='Listado de Consultas';

  listaDeConsultas: Consulta[] = [];

  constructor (private consultaService: ConsultaService){}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.consultaService
    .mostrarConsultas()
    .subscribe(
      (lasConsultas) => (this.listaDeConsultas = lasConsultas)
    );
  }

  /* [
    {
      idConsulta: 1,
      nombreConsulta: 'Deportes',
      descripcionConsulta: 'Articulos deportivos'
    },
    {
      idConsulta: 4,
      nombreConsulta: 'Deportes',
      descripcionConsulta: 'Articulos deportivos'
    }
  ]; */

  delete(consulta: Consulta): void{
    this.consultaService.eliminarConsulta(consulta.idConsulta)
        .subscribe((response) => 
          this.consultaService
            .mostrarConsultas()
            .subscribe(
              (lasConsultas) => (this.listaDeConsultas=lasConsultas)
            )
        );
  }
}
