import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PetitionsService } from '../../services/petitions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-account',
  imports: [FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent implements OnInit {
  constructor(private router:Router, private actroute: ActivatedRoute, private petition:PetitionsService){}
  email:string = ""
  activationCode:number = 0
  ngOnInit(): void {
    this.email = this.actroute.snapshot.params[("email")]
    this.activationCode = this.actroute.snapshot.params[("activationCode")]
  }
  activate(){
    let post = {
      host:this.petition.hostReal,
      path:"/activateAccount",
      payload:{
        email:this.email,
        activationCode:this.activationCode
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
        this.router.navigate(["/login"])
      }
    })
  }
}
