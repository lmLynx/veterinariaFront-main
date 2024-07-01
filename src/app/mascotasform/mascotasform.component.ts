import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../model/Mascota';
import { MascotaService } from '../service/mascota.service';

@Component({
  selector: 'app-mascotasform',
  templateUrl: './mascotasform.component.html',
  styleUrls: ['./mascotasform.component.css']
})
export class MascotasformComponent {
  titulo : string = "Datos de la Mascota"

  mascota: Mascota = new Mascota();

  constructor(
    private mascotaService : MascotaService,
    private router : Router,
    private rutaActiva : ActivatedRoute
  ){}

  ngOnInit(): void{
    this.mostrarMascota();
  }



  mostrarMascota(): void{
    this.rutaActiva.params.subscribe((parametro) => {
        let id = parametro['id']
        if(id){
          this.mascotaService
          .mostrarMascota(id)
          .subscribe((laMascota) => (this.mascota = laMascota));
        }
      
      });
  }

  registrarMascota(): void{
    this.mascotaService.crearMascota(this.mascota)
      .subscribe(
        (lamascota) => this.router.navigate(['/mascotas'])
      );
    //Swal.fire('registrado',`Categoría registrada con éxito`,'success');
  }

  updateMascota(): void{
    this.mascotaService.actualizarMascota(this.mascota)
      .subscribe(
        (lamascota) => this.router.navigate(['/mascotas'])
      );
    //Swal.fire('actualizado',`Categoría actualizada con éxito`,'success');
  }
}
