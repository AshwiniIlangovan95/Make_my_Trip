import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeTktBkngComponent } from './Home-tkt-bkng/home-tkt-bkng/home-tkt-bkng.component';
import { ResultComponent } from './Home-tkt-bkng/result/result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HomeTktBkngComponent,
    ResultComponent,
  ],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ticket_booking';
}
