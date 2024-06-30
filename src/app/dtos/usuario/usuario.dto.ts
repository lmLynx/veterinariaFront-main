import { ResultadoDTO } from "../resultado.dto";

export class UsuarioDTO extends ResultadoDTO{

  idUser: number;
  nombre: string;
  contrasena: string;
  tipoUsuarioEnum: string;
  correo: string;
  cedula: string;
  activo: boolean;
  cantidadMascotas: number;
  imagenUser: string;
  citasPendientes: number;
  celular: string;

}
