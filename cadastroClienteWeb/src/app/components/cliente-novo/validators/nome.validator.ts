import { AbstractControl } from "@angular/forms";

export class NomeValidator {


  static validate(control: AbstractControl): { [key: string]: boolean } | null {

    if (NomeValidator.isInvalid(control.value)) {
      return { 'nomeInvalido': true };
    }
    // if (NomeValidator.isInvalid2(control.value)) {
    //   return { 'nomeInvalido': true };
    // }

    return null;
  }

  static isInvalid(string: string): boolean {

    if (string === undefined || string === null || string === '') {
      return false;
    }
    // 1 - Deverá ser utilizado os caracteres de A a Z. Os demais caracteres não serão aceitos.
    // 2 - Deverá ter mais de uma palavra e o segundo nome deve ter pelo menos 1 caracter.
    // 3 - O primeiro nome pode ter apenas 1 caracter.
    //if (!(/[A-Z]\s[A-Z]/.test(string.toUpperCase()))) {
    //  return true;
    //}

    // //3 - valida se tem mais de 3 caracteres seguidos do mesmo
    //if(/([A-Z])\1{3,}/.test(string.toUpperCase())){
    //  return true;
    // }

    //valida se tem caracteres especial
    if(!(/^([A-Z| ])+$/.test(string.toUpperCase()))){
      return true;
    }

    //if(string.length <= 3){
    //  return true
    //}

    return false;
  }

  static validatePodendoCaracterEspecial(control: AbstractControl): { [key: string]: boolean } | null {

    if (NomeValidator.isInvalidPodendoCaracterEspecial(control.value)) {
      return { 'nomeInvalido': true };
    }
    // if (NomeValidator.isInvalid2(control.value)) {
    //   return { 'nomeInvalido': true };
    // }

    return null;
  }

  static isInvalidPodendoCaracterEspecial(string: string): boolean {

    if (string === undefined || string === null || string === '') {
      return false;
    }
    // 1 - Deverá ser utilizado os caracteres de A a Z. Os demais caracteres não serão aceitos.
    // 2 - Deverá ter mais de uma palavra e o segundo nome deve ter pelo menos 1 caracter.
    // 3 - O primeiro nome pode ter apenas 1 caracter.
    if (!(/[A-Z]\s[A-Z]/.test(string.toUpperCase()))) {
      return true;
    }

    // //3 - valida se tem mais de 3 caracteres seguidos do mesmo
    if(/([A-Z])\1{3,}/.test(string.toUpperCase())){
      return true;
    }

    return false;
  }


}
