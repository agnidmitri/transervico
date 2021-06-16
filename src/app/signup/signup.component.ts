import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User
  confirmaPass: string 
  tipoUsers: string

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.showPass()
    this.showPassConf()
  }

  confirmPass(event: any) {
    this.confirmaPass = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsers = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsers

    if (this.user.senha != this.confirmaPass){
      alert('As senhas não são correspondem')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/login'])
        alert('Cadastro realizado com sucesso!')
      })
    }
  }

  showPass() {
    let btn = document.querySelector('.fa-eye-slash')

    btn?.addEventListener('click', () => {
      let inputSenha = document.querySelector('#pass')

      if (inputSenha?.getAttribute('type') == 'password') {
        inputSenha?.setAttribute('type', 'text')
      } else {
        inputSenha?.setAttribute('type', 'password')
      }
    })
  }

  showPassConf() {
    let btn = document.querySelector('.fa-eye-slash')

    btn?.addEventListener('click', () => {
      let inputSenha = document.querySelector('#passconf')

      if (inputSenha?.getAttribute('type') == 'password') {
        inputSenha?.setAttribute('type', 'text')
      } else {
        inputSenha?.setAttribute('type', 'password')
      }
    })
  }
}
