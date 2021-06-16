import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostService } from '../service/post.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Post = new Post()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postService: PostService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    if (environment.token == '') {

      this.router.navigate(['/login'])
    }

    this.getAllTemas()
  }

  getAllTemas(){
      this.temaService.getAllTema().subscribe((resp: Tema[])=> {
        this.listaTemas = resp
      })
    }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.post.tema = this.tema
  
    this.user.id = this.idUser
    this.post.usuario = this.user

    this.postService.postPost(this.post).subscribe((resp: Post) =>{
      this.post = resp
      alert('Sua nova publicação foi criada!')
    })


  }


}
