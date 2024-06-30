import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreacionCitaInDTO } from '../dtos/cita/creacion-cita-in.dto';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsultasCitasUserOutDTO } from '../dtos/cita/consultas-citas-user-out.dto';
import { CitaMedicaDTO } from '../dtos/cita/cita-medica.dto';
import { ConsultaCitaFiltrosInDTO } from '../dtos/cita/consulta-cita-filtros-in.dto';
import { environment } from 'src/environment/environment.prod';
import { InformacionSistemaDTO } from '../dtos/info-sistema/informacion-sistema.dto';
// import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class InfoSistemaService {
  // private baseUrl = 'http://localhost:8080/veterinaria/cita';
  private baseUrl = environment.apiUrl + "/veterinaria/informacionSistema"; 
  private infoSistemaData = new BehaviorSubject<any>(null);
  infoSistemaData$ = this.infoSistemaData.asObservable();

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  consultarInformacionActual(): Observable<InformacionSistemaDTO> {
    const url = `${this.baseUrl}/consultarInformacionActual`;
    return this.http.get<InformacionSistemaDTO>(url);
  }

  editarInformacionActual(info: InformacionSistemaDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/editarInformacionActual`, info);
  }

  setInfoSistemaData(data: any) {
    this.infoSistemaData.next(data);
  }

  getInfoSistemaData() {
    return this.infoSistemaData.getValue();
  }

}
