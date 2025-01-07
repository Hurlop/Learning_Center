import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mision',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './mision.component.html',
  styleUrl: './mision.component.css'
})
export class MisionComponent {

}
