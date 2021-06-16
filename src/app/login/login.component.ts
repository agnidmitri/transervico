import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.showPass()
  }

  login(){
    this.auth.login(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      this.router.navigate(['/home'])
    }, erro =>{
      if(erro.status == 500){
        alert('Usuário ou senha estão incorretos.')
      }
    })
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
}
