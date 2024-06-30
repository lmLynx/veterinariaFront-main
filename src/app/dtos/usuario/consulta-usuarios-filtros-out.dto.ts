import { ResultadoDTO } from "../resultado.dto";
import { UsuarioDTO } from "./usuario.dto";

export class ConsultaUsuariosFiltrosOutDTO extends ResultadoDTO {

    usuarios : UsuarioDTO[] = [];
}