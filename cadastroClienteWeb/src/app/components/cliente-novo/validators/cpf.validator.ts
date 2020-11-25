import { AbstractControl } from '@angular/forms';
export class CpfValidator {
    constructor() { }

    static validate(control: AbstractControl): { [key: string]: boolean } | null {
        if (CpfValidator.isInvalid(control.value)) {
            return {'cpf': true};
        }
        return null;
    }

    static validateQtd(control: AbstractControl): { [key: string]: boolean } | null {
      var cpfExtraidoRegex = control.value.toString().replace(/[^\d]+/g,'');
      if(!!cpfExtraidoRegex){
        if(cpfExtraidoRegex.length < 11){
          return {'cpfErroQtd': true};
        }
      }
      return null;
    }

    static isInvalid(cpf) {
        if (cpf == null) {
            return null;
        }

        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length != 11) {
            return true;
        }

        for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                equalDigits = 0;
                break;
            }
        }

        if (equalDigits) {
            return true;
        }

        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
            return true;
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
            return true;
        }

        return false;
    }
}
