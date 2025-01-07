import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admisions',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './admisions.component.html',
  styleUrl: './admisions.component.css'
})
export class AdmisionsComponent {

}
