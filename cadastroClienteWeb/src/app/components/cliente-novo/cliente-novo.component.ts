import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { SharedService } from 'src/app/services/shared.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { CpfValidator } from './validators/cpf.validator';
import { NomeValidator } from './validators/nome.validator';
import { NgxViacepService, ErroCep, Endereco } from '@brunoc/ngx-viacep';
import { EnderecoModel } from 'src/app/model/endereco.model';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent implements OnInit {

  shared : SharedService;
  message : {};
  classCss : {};

  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public mascaraTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mascaraCep = [/\d/, /\d/, /\d/, /\d/ , /\d/, '-', /\d/, /\d/, /\d/];

  clienteForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  cpf =new FormControl('', [Validators.required, CpfValidator.validateQtd]);

  constructor(
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private viacep: NgxViacepService
    ) {
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
    this.clienteForm = this._formBuilder.group({
      id: [''],
      nome: new FormControl('', [Validators.required]),
      cpf: this.cpf,

      endereco: this._formBuilder.group({
        cep: [null, Validators.required],
        logradouro: [''],
        numero: [null, [Validators.required, Validators.min(1)]],
        complemento: [''],
        bairro: [''],
        uf: [''],
        municipio: [''],
      }),
      telefone: [''],
      email: this.email,
    });

    this.onChanges();
  }

  onChanges(): void {
    //this.clienteForm.get('endereco').get('cep').setValue(72220204);
    //this.clienteForm.get('endereco').get('logradouro').setValue('casa');
    //this.onChangeNome();
    //this.onChangeCpf();
  }

  findById(id:string){
    var idNumber: number = +id;
    this.clienteService.findById(idNumber).subscribe((responseApi:ResponseApi) => {

      this.clienteForm.get('id').setValue(responseApi.data.id),
      this.clienteForm.get('nome').setValue(responseApi.data.nome),
      this.clienteForm.get('cpf').setValue(responseApi.data.cpf),

      this.clienteForm.get('endereco').get('cep').setValue(responseApi.data.endereco.cep);
      this.clienteForm.get('endereco').get('logradouro').setValue(responseApi.data.endereco.logradouro.toString());
      this.clienteForm.get('endereco').get('numero').setValue(responseApi.data.endereco.numero.toString());
      this.clienteForm.get('endereco').get('complemento').setValue(responseApi.data.endereco.complemento.toString());
      this.clienteForm.get('endereco').get('bairro').setValue(responseApi.data.endereco.bairro.toString());
      this.clienteForm.get('endereco').get('uf').setValue(responseApi.data.endereco.uf.toString());
      this.clienteForm.get('endereco').get('municipio').setValue(responseApi.data.endereco.municipio.toString());

      this.clienteForm.get('telefone').setValue(responseApi.data.telefone);
      this.clienteForm.get('email').setValue(responseApi.data.email);
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  onChangeNome(): void {
    this.clienteForm.controls['nome'].valueChanges.subscribe(
      (nome: any) => {

        /*
        if(!!nome && !!nome.value){
          if(/([^a-z0-9\s-ªº])/.test(nome.value.toLowerCase())){
            return this.clienteForm.controls['nome'].setErrors({ 'nomeInvalido': true });
          }else{
            return this.clienteForm.controls['nome'].setErrors({ 'nomeInvalido': false });
          }
        }
        */

      }
    );
  }

  onChangeCpf(): void {
    this.clienteForm.controls['cpf'].valueChanges.subscribe(
      (cpf: any) => {

        /*
        var cpfExtraidoRegex = cpf.toString().replace(/[^\d]+/g,'');
        if(!!cpfExtraidoRegex){
          if(cpfExtraidoRegex.length < 11){
            return this.clienteForm.controls['cpf'].setErrors({ 'cpfErro': true });
          }else{
            return this.clienteForm.controls['cpf'].setErrors({ 'cpfErro': false });
          }
        }
        */

      }
    );
  }

  getEndereco(): void {
    var cepExtraidoRegex = this.clienteForm.get('endereco').get('cep').value.replace(/[^\d]+/g,'');
    if (!!cepExtraidoRegex) {
      this.clienteService.buscarCep(cepExtraidoRegex).subscribe( ( endereco: Endereco ) => {

        this.clienteForm.get('endereco').patchValue(endereco);
        this.clienteForm.get('endereco').get('municipio').setValue(endereco.localidade);

       }, err => {

      });

    }else{
      this.clienteForm.get('endereco').reset();
    }

    this.clienteForm.get('endereco').get('logradouro').setValue("");
    this.clienteForm.get('endereco').get('numero').setValue("");
    this.clienteForm.get('endereco').get('complemento').setValue("");
    this.clienteForm.get('endereco').get('bairro').setValue("");
    this.clienteForm.get('endereco').get('uf').setValue("");
    this.clienteForm.get('endereco').get('municipio').setValue("");

    this.clienteForm.get('endereco').get('cep').setErrors({ 'cepErro': true });

  }

  register(){
    this.message = {};
    if (this.clienteForm.valid) {
        this.clienteService.criarOuAtualizar(this.montarDtoCliente()).subscribe((responseApi:ResponseApi) => {
          this.limparForm();
          this.showMessage({
            type: 'success',
            text: `Cliente registrado com sucesso`
          });
        } , err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
    }
  }

  private limparForm(): void{

    this.clienteForm.get('nome').setValue("");
    this.clienteForm.get('cpf').setValue("");
    this.clienteForm.get('telefone').setValue("");
    this.clienteForm.get('email').setValue("");

    this.clienteForm.get('endereco').get('logradouro').setValue("");
    this.clienteForm.get('endereco').get('numero').setValue("");
    this.clienteForm.get('endereco').get('complemento').setValue("");
    this.clienteForm.get('endereco').get('bairro').setValue("");
    this.clienteForm.get('endereco').get('uf').setValue("");
    this.clienteForm.get('endereco').get('municipio').setValue("");
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

  montarDtoCliente(): Cliente {

    var cepExtraidoRegex = this.clienteForm.get('endereco').get('cep').value.replace(/[^\d]+/g,'');
    const endereco = new EnderecoModel(
      this.clienteForm.get('endereco').get('logradouro').value.toString(),
      this.clienteForm.get('endereco').get('numero').value.toString(),
      this.clienteForm.get('endereco').get('complemento').value.toString(),
      this.clienteForm.get('endereco').get('bairro').value.toString(),
      cepExtraidoRegex,
      this.clienteForm.get('endereco').get('uf').value.toString(),
      this.clienteForm.get('endereco').get('municipio').value.toString()
    );

    var cpfExtraidoRegex = this.clienteForm.get('cpf').value.replace(/[^\d]+/g,'');
    var telefoneExtraidoRegex = this.clienteForm.get('telefone').value.replace(/[^\d]+/g,'');
    const cliente = new Cliente(
      null,
      this.clienteForm.get('nome').value,
      cpfExtraidoRegex,
      endereco,
      telefoneExtraidoRegex,
      this.clienteForm.get('email').value
    );

    return cliente;
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  getEmailError(): any {
    const email = this.clienteForm.get('email');
    return email.hasError('required')
      ? 'Campo obrigatório'
      : email.hasError('email')
        ? 'E-mail deve ser um endereço de e-mail válido'
        : '';
  }

}
