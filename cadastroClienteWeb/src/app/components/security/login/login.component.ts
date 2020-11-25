import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/model/current-user.model';
import { Usuario } from 'src/app/model/usuario.model';
import { SharedService } from 'src/app/services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  shared : SharedService;
  message : string;

  loginForm: FormGroup;

  email = new FormControl('', [Validators.email, Validators.required]);

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this._formBuilder.group({
      email: this.email,
      password: ['']
    });
  }

  login(){
    if(this.isValidaPassWord()){
      this.message = '';
      this.usuarioService.login(this.montarUsuarioLogin()).subscribe((userAuthentication:CurrentUser) => {
        this.shared.token = userAuthentication.token;
        this.shared.usuario = userAuthentication.usuario;
        this.shared.usuario.profileEnum = this.shared.usuario.profileEnum.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
      } , err => {
        this.shared.token = null;
        this.shared.usuario = null;
        this.shared.showTemplate.emit(false);
        this.message = 'Erro ';
      });
    }
  }

  isValidaPassWord(): boolean {
    if(!this.loginForm.get('password').value){
      this.loginForm.controls['password'].setErrors({ 'required': true });
      return false;
    }
    return true;
  }

  montarUsuarioLogin(): Usuario {
    const usuarioDTO =  new Usuario(
      null,
      this.loginForm.get('email').value,
      this.loginForm.get('password').value,
      null
    );

    return usuarioDTO;
  }

  cancelLogin(){
    this.message = '';
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
