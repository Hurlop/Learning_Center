import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PetitionsService } from '../../services/petitions.service';
import { UsersComponent } from '../users/users.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-menu-dashboard',
  imports: [RouterModule, CommonModule, FormsModule,],
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.css'
})
export class MenuDashboardComponent {
  constructor(private petition:PetitionsService){}
  name:string = ""
  cellphone:number = 0
  email:string = ""
  password:any
  rol:string = "cliente"
  state:number = 0
  data:any[] = []
  selectedEmail:string = ""
  emailMod:string = ""
 
  openModal(){
    const modalElement = document.getElementById('formDeleteUser'); // Get the modal element by ID
    if (modalElement) {
      const modal = new Modal(modalElement); // Initialize the modal using Bootstrap's Modal class
      modal.show(); // Call the show method to display the modal
    }
  }
  newOpenModal(){
    const modalElement = document.getElementById('newUserModal'); // Get the modal element by ID
    if (modalElement) {
      const modal = new Modal(modalElement); // Initialize the modal using Bootstrap's Modal class
      modal.show(); // Call the show method to display the modal
    }
   
  }
  modOpenModal(){
    const modalElement = document.getElementById('modifyUser'); // Get the modal element by ID
    if (modalElement) {
      const modal = new Modal(modalElement); // Initialize the modal using Bootstrap's Modal class
      modal.show(); // Call the show method to display the modal
    }
  }
  newEntry(){
    this.name = ""
    this.cellphone = 0
    this.email = ""
    this.password = ""
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
  saveData(){
    let post = {
      host:this.petition.hostReal,
      path:"/RegistrarModal",
      payload:{
        name:this.name,
        cellphone:this.cellphone,
        email:this.email,
        password:this.password
      }
    }
    this.petition.post(post.host + post.path, post.payload).then((res:any) => {
      if(res.state == false){
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
  searchEmail(){
    let post = {
      host:this.petition.hostReal,
      path:"/mostrarRegistrosEmail",
      payload:{
        emailMod:this.emailMod
      }
    }
    this.petition.post(post.host + post.path, post.payload).then((res:any) => {
      if(res.state == false){
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Algo salio mal..." + res.mensaje,
        });
      } else {
        this.openModal()
        this.email = res.datos.email
        this.name = res.datos.name
        this.cellphone = res.datos.cellphone
        this.rol = res.datos.rol
        this.state = res.datos.state
      }
    })
  }

  updateInfoModal(){
    this.selectedEmail = this.email
    let post = {
      host:this.petition.hostReal,
      path:"/actualizarRegistro",
      payload:{
        email:this.selectedEmail,
        name:this.name,
        cellphone:this.cellphone,
        rol:this.rol,
        state:this.state
      }
    }
    this.petition.put(post.host + post.path, post.payload).then((res:any) =>{
      if(res.state == false){
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
    this.selectedEmail = this.email
    let post = {
      host:this.petition.hostReal,
      path:"/eliminarRegistro",
      payload:{
        email:this.selectedEmail
      }
    }
    this.petition.post(post.host + post.path, post.payload).then((res:any) =>{
      if(res.state == false){
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
}

