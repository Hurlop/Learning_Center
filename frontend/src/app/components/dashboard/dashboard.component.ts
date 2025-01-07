import { Component } from '@angular/core';
import { MenuDashboardComponent } from "../menu-dashboard/menu-dashboard.component";

@Component({
  selector: 'app-dashboard',
  imports: [MenuDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
