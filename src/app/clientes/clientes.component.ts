import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  titulo: string='Listado de Clientes';

  listaDeClientes: Cliente[] = [];

  constructor (private clienteService: ClienteService){}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.clienteService
    .mostrarClientes()
    .subscribe(
      (lasClientes) => (this.listaDeClientes = lasClientes)
    );
  }

  /* [
    {
      idCliente: 1,
      nombreCliente: 'Deportes',
      descripcionCliente: 'Articulos deportivos'
    },
    {
      idCliente: 4,
      nombreCliente: 'Deportes',
      descripcionCliente: 'Articulos deportivos'
    }
  ]; */

  delete(cliente: Cliente): void{
    this.clienteService.eliminarCliente(cliente.idCliente)
        .subscribe((response) => 
          this.clienteService
            .mostrarClientes()
            .subscribe(
              (lasClientes) => (this.listaDeClientes=lasClientes)
            )
        );
  }

}
