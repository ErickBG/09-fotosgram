import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts:Post[] = [];
  valor=false;

  constructor(private postService:PostService) {}

  ngOnInit(): void {
    
    this.next();
    this.postService.newPost
      .subscribe(post =>{
        this.posts.unshift(post);
      });
    
  }

  reload(e:any){
    this.posts = [];
    this.valor = false;
    this.next(e,true);
  }

  next(e?:any, pull:boolean=false){

    this.postService.getPosts(pull)
    .subscribe(resp=>{
      // console.log(resp);
      this.posts.push(...resp.post);

      if(e){
        e.target.complete();
        if(resp.post.length===0)
          this.valor = true;
      }
    });
  }

  

}
