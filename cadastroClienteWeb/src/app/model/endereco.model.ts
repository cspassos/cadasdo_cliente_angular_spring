export class EnderecoModel {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  municipio: string;

  constructor(
     logradouro: string,
     numero: string,
     complemento: string,
     bairro: string,
     cep: string,
     uf: string,
     municipio: string
  ){
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cep = cep;
    this.uf = uf;
    this.municipio = municipio
  }
}
