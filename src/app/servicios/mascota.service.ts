import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditarUsuarioMascotaInDTO } from '../dtos/usuario/editar-usuario-mascota-in.dto';
import { ConsultaMascotasUsuarioOutDTO } from '../dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMascotaComponent } from '../mascota/agregar-mascota/agregar-mascota.component';
import { creacionMascotaInDTO } from '../dtos/mascota/creacion-mascota-in.dto';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { EditarMascotaInDTO } from '../dtos/mascota/editar-mascota-in.dto';
import { environment } from 'src/environment/environment.prod';
// import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {

  //varias mascotas
  private mascotasData = new BehaviorSubject<any>(null);
  mascotasData$ = this.mascotasData.asObservable();

  //una sola mascota
  private mascotaData = new BehaviorSubject<any>(null);
  mascotaData$ = this.mascotaData.asObservable();

  // private baseUrl = '/veterinaria/mascota';
  private baseUrl = environment.apiUrl + "/veterinaria/mascota"; 

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  consultarMascotasUsuario(
    idUser: number
  ): Observable<ConsultaMascotasUsuarioOutDTO> {
    const url = `${this.baseUrl}/mascotasUsuario?idUser=${idUser}`;
    return this.http.get<ConsultaMascotasUsuarioOutDTO>(url);
  }

  crearMascota(inDTO: creacionMascotaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/crearMascota`, inDTO);
  }

  setMascotasData(data: any) {
    console.log(data);

    this.mascotasData.next(data);
  }

  getMascotasData() {
    return this.mascotasData.getValue();
  }

  setMascotaData(data: any) {
    this.mascotaData.next(data);
  }

  getMascotaData() {
    return this.mascotaData.getValue();
  }

  editarMascota(editarMascotaInDTO: EditarMascotaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/editarMascota`, editarMascotaInDTO);
  }

  /**
   * modal de ingresar a la app
   */
  openModalAgregarMascota(): void {
    this.dialog.open(AgregarMascotaComponent, {
      width: '400px',
      height: '550px',
      data: {},
    });
  }
}
