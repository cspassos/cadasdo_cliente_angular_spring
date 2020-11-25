import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule,
         MatFormFieldModule,  MatInputModule, MatProgressBarModule, MatSelectModule, MatCardModule,
         MatDatepickerModule,
         MatSortModule,
         MatTableModule,
         MatPaginatorModule,
         MatRadioModule,
         MatDividerModule,
         MatExpansionModule }
      from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioService } from './services/usuario.service';
import { SharedService } from './services/shared.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { AuthGuard } from './components/security/auth.guard';
import { NovoUsuarioComponent } from './components/novo-usuario/novo-usuario.component';
import { UsuarioListaComponent } from './components/usuario-lista/usuario-lista.component';
import { DialogService } from './services/dialog.service';
import { ClienteNovoComponent } from './components/cliente-novo/cliente-novo.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { ClienteListaComponent } from './components/cliente-lista/cliente-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NovoUsuarioComponent,
    UsuarioListaComponent,
    ClienteNovoComponent,
    ClienteListaComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgBrazil,
    NgxViacepModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],

  providers: [
    UsuarioService,
    SharedService,
    DialogService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
