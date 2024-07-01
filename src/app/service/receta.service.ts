import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { Receta } from '../model/Receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private urlEndPoint: string = 'http://localhost:8080/apiReceta/recetas';
  private httpHeaders = new HttpHeaders({
    TagContentType: 'application/json',
  });

  constructor(private http: HttpClient) { }

  mostrarRecetas(): Observable<Receta[]>{
    return this.http
    .get(this.urlEndPoint)
    .pipe(map((response) => response as Receta[]));
  }

  mostrarReceta(id : number): Observable<Receta>{
    return this.http.get<Receta>(`${this.urlEndPoint}/${id}`);
  }

  eliminarReceta(id: number): Observable<Receta>{
    return this.http.delete<Receta>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders
    });
  }

  crearReceta(receta: Receta): Observable<Receta>{
    return this.http.post<Receta>(
      this.urlEndPoint, 
      receta, 
      {
        headers: this.httpHeaders
      }
    );
  }

  actualizarReceta(receta: Receta): Observable<Receta>{
    return this.http.put<Receta>(
      `${this.urlEndPoint}/${receta.idReceta}`, 
      receta, 
      {
        headers: this.httpHeaders
      }
    );
  }
}
