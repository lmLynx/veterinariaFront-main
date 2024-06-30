import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { AgregarVacunaComponent } from './agregar-vacuna/agregar-vacuna.component';
import { VacunaService } from 'src/app/servicios/vacuna.service';
import { ConsultaVacunafiltrosInDTO } from 'src/app/dtos/vacuna/consulta-vacuna-filtros-in.dto';
import { ConsultaVacunafiltrosOutDTO } from 'src/app/dtos/vacuna/consulta-vacuna-filtros-out.dto';
import { VacunaDTO } from 'src/app/dtos/vacuna/vacuna.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/utiles/snackbar/CustomSnackbarComponent ';
import { ConsultarVacunaComponent } from './consultar-vacuna/consultar-vacuna.component';

@Component({
  selector: 'app-vacunas-control',
  templateUrl: './vacunas-control.component.html',
  styleUrls: ['../../../app.component.css', '../../../css/principal.css']
})
export class VacunasControlComponent {

  public vacunasForm: FormGroup;
  public tipos: string[] = ['Perro', 'Gato', 'Roedor', 'Ave', 'Pez'];
  tipo: string = '';

  consultaVacunafiltrosInDTO: ConsultaVacunafiltrosInDTO = new ConsultaVacunafiltrosInDTO();
  consultaVacunafiltrosOutDTO: ConsultaVacunafiltrosOutDTO;
  public listaVacunas: VacunaDTO[] = [];
  mostrarTabla: boolean = false;
  opcionSeleccionada: boolean =false;

  constructor(
    private form: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    private vacunaService : VacunaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.vacunasForm = this.form.group({
      tipo: [null],
    });
    this.consultarVacunas();
    // this.openSnackbar();
  }

  consultarVacunas(){

    console.log(this.vacunasForm.get('tipo')?.value);
    
    if (this.vacunasForm.get('tipo')?.value != null){

      if (this.vacunasForm.get('tipo')?.value === 'Perro'){
        this.consultaVacunafiltrosInDTO.tipoMascota = "PERRO"
      }
      
      if (this.vacunasForm.get('tipo')?.value === 'Gato'){
        this.consultaVacunafiltrosInDTO.tipoMascota = "GATO"
      }
      
      if (this.vacunasForm.get('tipo')?.value === 'Roedor'){
        this.consultaVacunafiltrosInDTO.tipoMascota = "ROEDOR"
      }

      if (this.vacunasForm.get('tipo')?.value === 'Ave'){
        this.consultaVacunafiltrosInDTO.tipoMascota = "AVE"
      }

      if (this.vacunasForm.get('tipo')?.value === 'Pez'){
        this.consultaVacunafiltrosInDTO.tipoMascota = "PEZ"
      }

    }

    this.vacunaService.consultarVacunasFiltros(this.consultaVacunafiltrosInDTO).subscribe(res=>{
      this.consultaVacunafiltrosOutDTO = res;

      console.log(this.consultaVacunafiltrosOutDTO);
      
      if (this.consultaVacunafiltrosOutDTO.exitoso){
        this.listaVacunas = this.consultaVacunafiltrosOutDTO.listaVacunas;
        if (this.listaVacunas != null && this.listaVacunas.length > 0){
          this.mostrarTabla = true;
        }else{
          this.mostrarTabla = false;

        }
      }else{
        this.serviciosVeterinariaService.openInfoModal(this.consultaVacunafiltrosOutDTO.mensaje);
      }
    });
  }

  agregarVacuna() {
    //this.mascotaService.openModalAgregarMascota();
    // this.showModal = true;
    const dialogoModal = this.dialog.open(AgregarVacunaComponent, {
      disableClose:true
    });

    dialogoModal.afterClosed().subscribe(e => {
        this.consultarVacunas();
    });
  }
  
  consultarVacuna(vacuna: any) {

    const dialogoModal=this.dialog.open(ConsultarVacunaComponent, {
      data: { vacuna: vacuna },
      width: '50%', 
      disableClose:true
    });

    dialogoModal.afterClosed().subscribe(e => {
      this.consultarVacunas();
  });
  }
  
  cancelarVacuna(vacuna: any) {}

  deseleccionar(){
    this.tipo = '';
    this.opcionSeleccionada= false;
  }

  seleccionar(){
    this.opcionSeleccionada= true;
  }

  openSnackbar() {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: 'Mensaje personalizado' },
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
