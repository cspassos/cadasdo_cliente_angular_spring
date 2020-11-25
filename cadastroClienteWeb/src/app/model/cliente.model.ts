import { EnderecoModel } from "./endereco.model";

export class Cliente {
  constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public endereco: EnderecoModel,
    public telefone: string,
    public email: string
  ){}
}
