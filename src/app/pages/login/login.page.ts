import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserCredentials } from 'src/app/interfaces/user-credentials';
import { AuthService } from 'src/app/services/api/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router,
    private toast:ToastController
  ) { }

  ngOnInit() {
  }

  onLogin(credentials:UserCredentials) {
    this.auth.login(credentials).subscribe({
      next: (user:any) => {
        console.log(user)
        this.router.navigate(['/home'])
      },
      error: (err: any) => {
        const options:ToastOptions = {
          message:`Las credenciales no son correctas`,
          duration:1000,
          position:'bottom',
          color:'danger',
          cssClass:'red-toast'
        }
        this.toast.create(options).then(toast=>toast.present())
        console.error(err)
      }
    })
  }

  onLoginAnonymously() {
    this.auth.loginAnonymously().subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: (err:any) => {
        console.log(err)
      }
    })
  }
}
