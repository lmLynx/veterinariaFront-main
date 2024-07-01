import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-clientesform',
  templateUrl: './clientesform.component.html',
  styleUrls: ['./clientesform.component.css']
})
export class ClientesformComponent {
  titulo : string = "Datos de la Cliente"

  cliente: Cliente = new Cliente();

  constructor(
    private clienteService : ClienteService,
    private router : Router,
    private rutaActiva : ActivatedRoute
  ){}

  ngOnInit(): void{
    this.mostrarCliente();
  }



  mostrarCliente(): void{
    this.rutaActiva.params.subscribe((parametro) => {
        let id = parametro['id']
        if(id){
          this.clienteService
          .mostrarCliente(id)
          .subscribe((laCliente) => (this.cliente = laCliente));
        }
      
      });
  }

  registrarCliente(): void{
    this.clienteService.crearCliente(this.cliente)
      .subscribe(
        (lacliente) => this.router.navigate(['/clientes'])
      );
    //Swal.fire('registrado',`Categoría registrada con éxito`,'success');
  }

  updateCliente(): void{
    this.clienteService.actualizarCliente(this.cliente)
      .subscribe(
        (lacliente) => this.router.navigate(['/clientes'])
      );
    //Swal.fire('actualizado',`Categoría actualizada con éxito`,'success');
  }


}
