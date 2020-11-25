import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ResponseApi } from './../../model/response-api';
import { Usuario } from 'src/app/model/usuario.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioNovo } from 'src/app/model/usuario-novo.model.';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  usuario = new UsuarioNovo('','','','');
  shared : SharedService;
  message : {};
  classCss : {};
  isValidSenha: Boolean = false;
  isValidProfile: Boolean = false;

  novoUsuarioForm: FormGroup;
  email = new FormControl('', [Validators.email, Validators.required]);

  constructor(
    private _formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute) {
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.buildForm();
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  buildForm() {
    this.novoUsuarioForm = this._formBuilder.group({
      id: [''],
      email: this.email,
      senha: [''],
      profileEnum: ['']
    });
  }

  findById(id:string){
    this.usuarioService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.usuario = responseApi.data;
      this.novoUsuarioForm.get('id').setValue(this.usuario.id),
      this.novoUsuarioForm.get('email').setValue(this.usuario.email),
      this.novoUsuarioForm.get('profileEnum').setValue(this.usuario.profileEnum),
      this.novoUsuarioForm.get('senha').setValue('')
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    if(this.validaSenhaProfile()){
      this.usuarioService.criarOuAtualizar(this.montarUsuario()).subscribe((responseApi:ResponseApi) => {
          let userRet : Usuario = responseApi.data;
          this.novoUsuarioForm.reset();
          this.showMessage({
            type: 'success',
            text: `${userRet.email} registrado com sucesso`
          });
      } , err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    }
  }

  validaSenhaProfile(): boolean {
    if(!this.novoUsuarioForm.get('senha').value && !this.novoUsuarioForm.get('profileEnum').value){
      this.isValidSenha = true;
      this.isValidProfile = true;
      return false;
    }
    else if(!this.novoUsuarioForm.get('senha').value){
      this.isValidSenha = true;
      return false;
    }
    else if(!this.novoUsuarioForm.get('profileEnum').value){
      this.isValidProfile = true;
      return false;
    }

    return true;
  }

  montarUsuario(): UsuarioNovo {
    const usuarioDTO =  new UsuarioNovo(
      !!this.novoUsuarioForm.get('id').value ? this.novoUsuarioForm.get('id').value : null,
      this.novoUsuarioForm.get('email').value,
      this.novoUsuarioForm.get('senha').value,
      this.novoUsuarioForm.get('profileEnum').value,
    );

    return usuarioDTO;
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] =  true;
  }

}
