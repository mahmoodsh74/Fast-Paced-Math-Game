import {AbstractControl} from "@angular/forms";

export class MathValidations {
  static additional(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];//answer
      const numberOne = form.value[sourceOne];//a
      const numberTwo = form.value[sourceTwo];//b
      if (numberOne + numberTwo === sum) return null;
      return {additional: true};
    }
  }
}
