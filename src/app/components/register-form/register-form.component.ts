import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterInfo } from 'src/app/interfaces/user-register-info';
import { PasswordValidation } from 'src/app/validators/password';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {
  @Output() onsubmit = new EventEmitter<UserRegisterInfo>();
  form:FormGroup
  constructor(
    private formB:FormBuilder
  ) { 
    this.form = formB.group({
      email:['',[Validators.required]],
      name:['',[Validators.required]],
      surname:['',[Validators.required]],
      nickname:['',[Validators.required]],
      password:['',[Validators.required, PasswordValidation.passwordProto('password')]],
      confirm:['',[Validators.required, PasswordValidation.passwordProto('confirm')]]
    }, {
      validator:[PasswordValidation.passwordMatch('password','confirm')]
    })
  }

  ngOnInit() {}

  onSubmit() {
    this.onsubmit.emit(this.form.value)
  }

}
