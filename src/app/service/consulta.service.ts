import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { Consulta } from '../model/Consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private urlEndPoint: string = 'http://localhost:8080/apiConsulta/consultas';
  private httpHeaders = new HttpHeaders({
    TagContentType: 'application/json',
  });

  constructor(private http: HttpClient) { }

  mostrarConsultas(): Observable<Consulta[]>{
    return this.http
    .get(this.urlEndPoint)
    .pipe(map((response) => response as Consulta[]));
  }

  mostrarConsulta(id : number): Observable<Consulta>{
    return this.http.get<Consulta>(`${this.urlEndPoint}/${id}`);
  }

  eliminarConsulta(id: number): Observable<Consulta>{
    return this.http.delete<Consulta>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders
    });
  }

  crearConsulta(consulta: Consulta): Observable<Consulta>{
    return this.http.post<Consulta>(
      this.urlEndPoint, 
      consulta, 
      {
        headers: this.httpHeaders
      }
    );
  }

  actualizarConsulta(consulta: Consulta): Observable<Consulta>{
    return this.http.put<Consulta>(
      `${this.urlEndPoint}/${consulta.idConsulta}`, 
      consulta, 
      {
        headers: this.httpHeaders
      }
    );
  }
}
