import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from '../model/Consulta';
import { ConsultaService } from '../service/consulta.service';

@Component({
  selector: 'app-consultasform',
  templateUrl: './consultasform.component.html',
  styleUrls: ['./consultasform.component.css']
})
export class ConsultasformComponent {
  titulo : string = "Datos de la Consulta"

  consulta: Consulta = new Consulta();

  constructor(
    private consultaService : ConsultaService,
    private router : Router,
    private rutaActiva : ActivatedRoute
  ){}

  ngOnInit(): void{
    this.mostrarConsulta();
  }



  mostrarConsulta(): void{
    this.rutaActiva.params.subscribe((parametro) => {
        let id = parametro['id']
        if(id){
          this.consultaService
          .mostrarConsulta(id)
          .subscribe((laConsulta) => (this.consulta = laConsulta));
        }
      
      });
  }

  registrarConsulta(): void{
    this.consultaService.crearConsulta(this.consulta)
      .subscribe(
        (laconsulta) => this.router.navigate(['/consultas'])
      );
    //Swal.fire('registrado',`Categoría registrada con éxito`,'success');
  }

  updateConsulta(): void{
    this.consultaService.actualizarConsulta(this.consulta)
      .subscribe(
        (laconsulta) => this.router.navigate(['/consultas'])
      );
    //Swal.fire('actualizado',`Categoría actualizada con éxito`,'success');
  }
}
