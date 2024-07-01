import { Consulta } from "./Consulta";

export class Receta {
    idReceta: number = 0;
    fecha: Date = new Date();
    medicamento: string = '';
    indicaciones: string = '';
    idConsulta: Consulta = new Consulta();
}