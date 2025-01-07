import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MenuDashboardComponent } from "../menu-dashboard/menu-dashboard.component";
import { PetitionsService } from '../../services/petitions.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [MenuDashboardComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  constructor(private petition:PetitionsService){}
  data:any[] = []
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    let post = {
      host:this.petition.hostReal,
      path:"/mostrarRegistros",
      payload:{
      }
    }
    this.petition.get(post.host + post.path).then((res:any) => {
      this.data = res.datos
    })
  }
}
