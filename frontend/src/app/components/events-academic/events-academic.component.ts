import { Component, OnInit } from '@angular/core';
import { MenuDashboardComponent } from '../menu-dashboard/menu-dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetitionsService } from '../../services/petitions.service';
import Swal from 'sweetalert2';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-events-academic',
  imports: [MenuDashboardComponent, CommonModule, RouterModule, FormsModule,],
  templateUrl: './events-academic.component.html',
  styleUrl: './events-academic.component.css'
})
export class EventsAcademicComponent implements OnInit {
  constructor(private petition:PetitionsService){}
  data:any[] = []
  ngOnInit(): void {
    this.loadData()
  }
  eventTitle:String = ""
  description:String = ""
  date:String = ""
  place:String = ""

  eventTitleMod:String = ""
  descriptionMod:String = ""
  dateMod:String = ""
  placeMod:String = ""
  selectedId:String = ""

  modOpenModal(){
    const modalElement = document.getElementById('modEvent'); // Get the modal element by ID
    if (modalElement) {
      const modal = new Modal(modalElement); // Initialize the modal using Bootstrap's Modal class
      modal.show(); // Call the show method to display the modal
    }
  }

  saveData(){
    let post = {
      host: this.petition.hostReal,
      path: "/RegistrarEventoAcademico",
      payload: {
        eventTitle: this.eventTitle,
        description: this.description,
        date: this.date,
        place: this.place
      }
    }
    this.petition.post(post.host + post.path, post.payload).then((res: any) => {
      if (res.state == false) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Algo salio mal..." + res.mensaje,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Genial!",
          text: res.mensaje,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        });
      }
    })
  }
  loadData(){
    let post = {
      host:this.petition.hostReal,
      path:"/mostrarRegistrosEventoAcademico",
      payload:{
      }
    }
    this.petition.get(post.host + post.path).then((res:any) => {
      this.data = res.datos
    })
  }

  editEventMod(_id:string){
    this.selectedId = _id
    let post = {
      host:this.petition.hostReal,
      path:"/mostrarRegistrosEventoAcademicoId",
      payload:{
        _id:_id
      }
    }
    this.petition.post(post.host + post.path, post.payload).then((res:any) => {
      this.modOpenModal()
      this.eventTitleMod = res.datos[0].eventTitle
      this.descriptionMod = res.datos[0].description
      this.dateMod = res.datos[0].date
      this.placeMod = res.datos[0].place
    })
  }
  updateInfoModal(){
    let post = {
      host: this.petition.hostReal,
      path: "/actualizarRegistroEventoAcademico",
      payload: {
        _id: this.selectedId,
        eventTitle: this.eventTitleMod,
        description: this.descriptionMod,
        date: this.dateMod,
        place: this.placeMod
      }
    }
    this.petition.put(post.host + post.path, post.payload).then((res: any) => {
      if (res.state == false) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Algo salio mal..." + res.mensaje,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Genial!",
          text: res.mensaje,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        });
      }
    })
  }
  deleteInfoModal(){
    let post = {
      host: this.petition.hostReal,
      path: "/eliminarRegistroEventoAcademico",
      payload: {
        _id: this.selectedId,
      }
    }
    this.petition.post(post.host + post.path, post.payload).then((res: any) => {
      if (res.state == false) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Algo salio mal..." + res.mensaje,
        });
      } else {
        this.loadData()
        Swal.fire({
          icon: "success",
          title: "¡Genial!",
          text: res.mensaje,
        })
      }
    })
  }
}
