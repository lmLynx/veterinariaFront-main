// info-box.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  template: `
    <div class="info-box">
      {{ infoText }}
    </div>
  `,
  styles: [`
    .info-box {
      background-color: lightblue; /* Color de fondo azul claro */
      color: #333; /* Color de texto */
      padding: 16px;
      border-radius: 8px; /* Borde redondeado */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
    }
  `],
})
export class InfoBoxComponent {
  @Input() infoText: string = 'No se encontraron resultados para los filtros ingresados';
}
