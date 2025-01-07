import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetitionsService } from '../../services/petitions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private petition:PetitionsService, private router:Router){}

  name:string = ""
  cellphone:number = 0
  email:string = ""
  pass1:string = ""

  login(){
    let post = {
      host:this.petition.hostReal,
      path:"/login",
      payload:{
        email:this.email,
        password:this.pass1
      }
    }
    this.petition.post(post.host + post.path,post.payload).then((res:any) =>{
      if(res.state == false){
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Algo salio mal..." + res.mensaje,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Perfecto!",
          text: res.mensaje,
        });
        this.router.navigate(["/dashboard"])
      }
    })
  }
}
