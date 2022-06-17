import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  pagePost = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http:HttpClient, private userService:UsuarioService) { }

  getPosts(pull:boolean = false){
    
    if(pull)
    this.pagePost = 0;

    this.pagePost++;
    return this.http.get<RespuestaPosts>(`${URL}/posts?page=${this.pagePost}`);
    
  }

  createPost(post){
    
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve =>{
      this.http.post(`${URL}/posts`,post,{headers})
      .subscribe(resp => {
        this.newPost.emit(resp['post']);
        resolve(true);
      });
    });
  }
}
