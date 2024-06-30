import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  './lib/flaticon/font/flaticon.css']
})
export class AppComponent {
  title = 'front-veterinaria';

  constructor(private router: Router) { }

}
