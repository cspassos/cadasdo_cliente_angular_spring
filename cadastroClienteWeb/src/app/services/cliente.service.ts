import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente.model';
import { CADASTRO_CLIENTE } from './cadastroCliente.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) {}

  buscarCep(cep: any) {
    return new Observable((x)=>{
    var request = new XMLHttpRequest();
    request.open('get', `https://viacep.com.br/ws/${cep}/json/`, true);
    request.send();
    request.onload = function () {
    var data = JSON.parse(this.response);
    x.next(data)
    }
    })
    }

  criarOuAtualizar(cliente: Cliente){
    if(cliente.id != null && cliente.id != null){
      return this.http.put(`${CADASTRO_CLIENTE}/api/cliente`,cliente);
    } else {
      cliente.id = null;
      return this.http.post(`${CADASTRO_CLIENTE}/api/cliente`, cliente);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${CADASTRO_CLIENTE}/api/cliente/${page}/${count}`);
  }

  findById(id:number){
    return this.http.get(`${CADASTRO_CLIENTE}/api/cliente/${id}`);
  }

  delete(id:number){
    return this.http.delete(`${CADASTRO_CLIENTE}/api/cliente/${id}`);
  }

}
