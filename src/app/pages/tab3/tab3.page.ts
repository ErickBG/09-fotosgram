import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario:User = {};

  constructor(private usuarioService:UsuarioService, private uiService:UiServiceService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUserInfo();
    console.log(this.usuario);
  }

  async updateUser(fActualizar:NgForm){
    if(fActualizar.invalid)
      return;
    
    const updated = await this.usuarioService.updateUser(this.usuario);
    console.log(updated);

    if(updated){
      this.uiService.presentToast('Usuario actualizado');
    }else{
      this.uiService.presentToast('Ocurrió un error al actualizar');
    }
      
  }

  logout(){

  }
}
