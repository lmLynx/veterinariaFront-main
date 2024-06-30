import { CitaMedicaDTO } from "../cita/cita-medica.dto";

export class MascotaDTO {
  id: number;
  nombre: string;
  dueno: string;
  edad: number;
  raza: string;
  tipoMascota: string;
  clicked: boolean = false;
  imagenMascota: string;
  observacion: string;

  listaServicios:  CitaMedicaDTO[] = []; 
}
