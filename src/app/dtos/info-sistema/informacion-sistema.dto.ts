import { ResultadoDTO } from "../resultado.dto";

export class InformacionSistemaDTO extends ResultadoDTO{
     id: number;
     actual: boolean;
     horariosAtencion: string;
     correo: string;
     telefono: string;
     ubicacion: string;
}