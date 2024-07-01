import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../service/receta.service';
import { Receta } from '../model/Receta';

@Component({
  selector: 'app-recetasform',
  templateUrl: './recetasform.component.html',
  styleUrls: ['./recetasform.component.css']
})
export class RecetasformComponent {
  titulo : string = "Datos de la Receta"

  receta: Receta = new Receta();

  constructor(
    private recetaService : RecetaService,
    private router : Router,
    private rutaActiva : ActivatedRoute
  ){}

  ngOnInit(): void{
    this.mostrarReceta();
  }



  mostrarReceta(): void{
    this.rutaActiva.params.subscribe((parametro) => {
        let id = parametro['id']
        if(id){
          this.recetaService
          .mostrarReceta(id)
          .subscribe((laReceta) => (this.receta = laReceta));
        }
      
      });
  }

  registrarReceta(): void{
    this.recetaService.crearReceta(this.receta)
      .subscribe(
        (lareceta) => this.router.navigate(['/recetas'])
      );
    //Swal.fire('registrado',`Categoría registrada con éxito`,'success');
  }

  updateReceta(): void{
    this.recetaService.actualizarReceta(this.receta)
      .subscribe(
        (lareceta) => this.router.navigate(['/recetas'])
      );
    //Swal.fire('actualizado',`Categoría actualizada con éxito`,'success');
  }
}
