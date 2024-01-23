import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLogin(credentials:UserCredentials) {
    this.auth.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/home'])
        this.auth.isLogged$.subscribe(logged => {
          console.log(logged)
        })
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
