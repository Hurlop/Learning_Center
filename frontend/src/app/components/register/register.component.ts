import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PetitionsService } from '../../services/petitions.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  imports: [HeaderComponent,FooterComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private petition:PetitionsService){}

  name:string = ""
  cellphone:number = 0
  email:string = ""
  pass1:string = ""

  register(){
    let post = {
      host:this.petition.hostReal,
      path:"/Registrar",
      payload:{
        email:this.email,
        name:this.name,
        cellphone:this.cellphone,
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
      }
    })
  }
}
