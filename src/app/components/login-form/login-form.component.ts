import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/interfaces/user-credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  form:FormGroup | null = null
  @Input('email') set email (value:string) {
    this.form?.controls['email'].setValue(value)
  }

  @Output() onsubmit = new EventEmitter<UserCredentials>()
  @Output() onsubmitAnonymously = new EventEmitter<void>()

  constructor(
    private formBuilder:FormBuilder,
  ) { 
    this.form = formBuilder.group( {
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.onsubmit.emit(this.form?.value)
    this.form?.controls['password'].setValue('')
  }

  onSubmitAnonymously() {
    this.onsubmitAnonymously.emit()
  }
}
