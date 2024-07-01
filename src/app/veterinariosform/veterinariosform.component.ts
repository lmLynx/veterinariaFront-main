import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from '../service/veterinario.service';
import { Veterinario } from '../model/Veterinario';

@Component({
  selector: 'app-veterinariosform',
  templateUrl: './veterinariosform.component.html',
  styleUrls: ['./veterinariosform.component.css']
})
export class VeterinariosformComponent {
  titulo : string = "Datos de la Veterinario"

  veterinario: Veterinario = new Veterinario();

  constructor(
    private veterinarioService : VeterinarioService,
    private router : Router,
    private rutaActiva : ActivatedRoute
  ){}

  ngOnInit(): void{
    this.mostrarVeterinario();
  }



  mostrarVeterinario(): void{
    this.rutaActiva.params.subscribe((parametro) => {
        let id = parametro['id']
        if(id){
          this.veterinarioService
          .mostrarVeterinario(id)
          .subscribe((laVeterinario) => (this.veterinario = laVeterinario));
        }
      
      });
  }

  registrarVeterinario(): void{
    this.veterinarioService.crearVeterinario(this.veterinario)
      .subscribe(
        (laveterinario) => this.router.navigate(['/veterinarios'])
      );
    //Swal.fire('registrado',`Categoría registrada con éxito`,'success');
  }

  updateVeterinario(): void{
    this.veterinarioService.actualizarVeterinario(this.veterinario)
      .subscribe(
        (laveterinario) => this.router.navigate(['/veterinarios'])
      );
    //Swal.fire('actualizado',`Categoría actualizada con éxito`,'success');
  }

}
