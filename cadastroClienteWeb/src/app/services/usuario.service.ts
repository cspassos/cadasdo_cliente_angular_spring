import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario.model';
import { CADASTRO_CLIENTE } from './cadastroCliente.api';
import { UsuarioNovo } from '../model/usuario-novo.model.';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) {}

    login(usuario: Usuario) {
      return this.http.post(`${CADASTRO_CLIENTE}/api/auth`, usuario);
    }

    criarOuAtualizar(usuario: UsuarioNovo){
      if(usuario.id != null && usuario.id != ''){
        return this.http.put(`${CADASTRO_CLIENTE}/api/usuario`,usuario);
      } else {
        usuario.id = null;
        return this.http.post(`${CADASTRO_CLIENTE}/api/usuario`, usuario);
      }
    }

    findAll(page:number,count:number){
      return this.http.get(`${CADASTRO_CLIENTE}/api/usuario/${page}/${count}`);
    }

    findById(id:string){
      return this.http.get(`${CADASTRO_CLIENTE}/api/usuario/${id}`);
    }

    delete(id:string){
      return this.http.delete(`${CADASTRO_CLIENTE}/api/usuario/${id}`);
    }

}
