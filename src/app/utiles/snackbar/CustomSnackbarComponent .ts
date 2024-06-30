
// custom-snackbar.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  template: `
    <div class="custom-snackbar">
      {{ data.message }}
    </div>
  `,
  styles: [`
    .custom-snackbar {
      background-color: lightblue; /* Color de fondo azul claro */
      color: #333; /* Color de texto */
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `],
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
