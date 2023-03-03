import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {MathValidations} from "../_validations/math-validations";
import {debounceTime, Subscription} from "rxjs";
import {delay, filter, scan} from "rxjs/operators";

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit, OnDestroy {
  public sub: Subscription | undefined;
  public correct: number = 0;
  public secondPerSolution = 0;
  matchForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [
    MathValidations.additional('answer', 'a', 'b')
  ]);

  public get a() {
    // @ts-ignore
    return this.matchForm.get('a').value;
  }

  public get b() {
    // @ts-ignore
    return this.matchForm.get('b').value;
  }

  ngOnInit(): void {
    // const startTime = new Date();
    this.sub = this.matchForm.statusChanges
      .pipe(
        delay(400),
        // debounceTime(1000),
        filter((response) => response === 'VALID'),
        scan((acc) => {
          return {
            numberSolve: this.correct++,
            startTime: acc.startTime
          }
        }, {numberSolve: 0, startTime: new Date()})
      )
      .subscribe(({startTime}) => {
        // if (response === 'INVALID') {
        //   return;
        // }
        // this.correct++;
        this.secondPerSolution =
          // (new Date().getTime() - startTime.getTime()) / this.correct / 1000;
          (new Date().getTime() - startTime.getTime()) / this.correct / 1000;
        this.matchForm.patchValue({
          // a: this.randomNumber(),
          b: this.randomNumber(),
          answer: ''
        })
      })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  highlightValidation(numberOne: any, numberTwo: any, answer: any) {
if(numberOne+numberTwo*0.8<answer){
  return true;
}
return false;
  }
}
