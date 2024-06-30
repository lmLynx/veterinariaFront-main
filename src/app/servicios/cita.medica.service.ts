import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreacionCitaInDTO } from '../dtos/cita/creacion-cita-in.dto';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { Observable } from 'rxjs';
import { ConsultasCitasUserOutDTO } from '../dtos/cita/consultas-citas-user-out.dto';
import { CitaMedicaDTO } from '../dtos/cita/cita-medica.dto';
import { ConsultaCitaFiltrosInDTO } from '../dtos/cita/consulta-cita-filtros-in.dto';
import { environment } from 'src/environment/environment.prod';
// import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CitaMedicaService {
  // private baseUrl = 'http://localhost:8080/veterinaria/cita';
  private baseUrl = environment.apiUrl + "/veterinaria/cita"; 

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  /**
   * Metodo encargado de llamar el backend para crear una cita
   * @param inDTO 
   * @returns 
   */
  crearCita(inDTO: CreacionCitaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/crearCita`, inDTO);
  }

  consultarCitasUsuario(iduser: number): Observable<ConsultasCitasUserOutDTO> {
    const url = `${this.baseUrl}/consultarCitasUsuario?idUser=${iduser}`;
    return this.http.get<ConsultasCitasUserOutDTO>(url);
  }

  cancelarCita(cita: CitaMedicaDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/cancelarCita`, cita);
  }

  consultarCitasFiltros(inDTO: ConsultaCitaFiltrosInDTO): Observable<ConsultasCitasUserOutDTO> {
    return this.http.post<ConsultasCitasUserOutDTO>(`${this.baseUrl}/consultarCitasFiltros`, inDTO);
  }
}
