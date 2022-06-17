import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare var window:any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages:string[] = [];
  loadGeo = false;

  post = {
    message:'',
    coords:'19.393054246137012, -99.15716214705417',
    position:false
  };

  constructor(private postService:PostService, private route:Router, private geolocation:Geolocation, private camera:Camera) {}

  async crearPost(){
    console.log(this.post);
    const is_created = await this.postService.createPost(this.post);

    this.post = {
      message:'',
      coords:'',
      position:false
    };

    this.route.navigateByUrl('/main/tabs/tab1');

  }

  getGeo(){
    if(!this.post.position){
      this.post.coords = null;
      return;
    }

    this.loadGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
     }).catch((error) => {
      this.loadGeo = false;
      this.post.coords = null;
     });

    console.log(this.post);
  }

  camara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    
    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //  let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFilesSrc(imageData);
      console.log(img);
      this.tempImages.push(img);
    }, (err) => {
      // Handle error
    });
  }

}
