import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MenuDashboardComponent } from '../menu-dashboard/menu-dashboard.component';

@Component({
  selector: 'app-events',
  imports: [MenuDashboardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

}
