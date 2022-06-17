import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide') slides:IonSlides;

  

  loginUser={
    email:'dev.ebalderas@gmail.com',
    password:'qwerty123'
  };

  registerUser:User = {
    email: 'dev.ebalderas@gmail.com',
    password: 'qwert123',
    nameUser: 'Erick B',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService:UsuarioService, private navCtrl:NavController, private uiService:UiServiceService) { }

  ngOnInit() {  
  }

  async ionViewDidEnter() {
    await this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){

    if(fLogin.invalid)
      return;

    const valid = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);

    if(valid)
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    else
      this.uiService.informativeAlert('Usuario o contraseña no son correctos');
    
    console.log(fLogin.valid);
    console.log(this.loginUser);
  }

  async registro(fRegistro:NgForm){

    if(fRegistro.invalid)
      return
    
    const valid = await this.usuarioService.registro(this.registerUser);

    if(valid)
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    else
      this.uiService.informativeAlert('El correo ingresado ya existe');

    console.log(fRegistro.valid);
  }

  async toLogin(){
    await this.slides.lockSwipes(false);
    await this.slides.slideTo(0);
  }

  async toRegister(){
    await this.slides.lockSwipes(false);    
    await this.slides.slideTo(1);
  }
}
