import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public shared: SharedService;

  constructor(private usuarioService: UsuarioService,
      private router: Router
    ){
    this.shared = SharedService.getInstance();
    this.shared.usuario = new Usuario('','','','');
}

  ngOnInit() {
  }

  signOut() : void {
    this.shared.token = null;
    this.shared.usuario = null;
    window.location.href = '/login';
    window.location.reload();
  }

}
