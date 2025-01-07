import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Modal, Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  openModal(){
      const modalElement = document.getElementById('offcanvasNavbar'); // Get the modal element by ID
      if (modalElement) {
        const modal = new Offcanvas(modalElement); // Initialize the modal using Bootstrap's Modal class
        modal.show(); // Call the show method to display the modal
      }
    }
}
