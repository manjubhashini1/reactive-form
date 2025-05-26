import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpserviceService } from '../services/httpservice.service';
import { distinct, map, take } from 'rxjs';
import { Student } from '../mockinterface';
import { STUDENTS } from './mockUser';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  taskForm!: FormGroup;
  priorities = ['Low', 'Medium', 'High'];
  showSubmitData: boolean = false;
  submittedData: any;
  httpResponse: any;
  selectedUser: any = null;
  students: Student[] = [];

  constructor(private fb: FormBuilder, private api: HttpserviceService) {
    this.taskForm = this.fb.group({
      title: ['blahhh', Validators.required],
      description: ['djdgkdgk'],
      dueDate: ['', Validators.required],
      //dueDate: "19/01/1995",
      priority: ['Medium'],
      phone: ['5123345543', [Validators.required, phoneValidator()]],
      email: [
        'sjsfk@gmAIL.COM',
        [
          Validators.required,
          Validators.email,
          customEmailValidator('@gmail.com'),
        ],
      ],
    });
  }

  ngOnInit() {
    this.getStaticData();
  }

  onSubmit(): void {
    this.submittedData = '';
    this.httpResponse = '';
    this.getHttpData();
    if (this.taskForm.valid) {
      this.showSubmitData = true;
      this.submittedData = this.taskForm.value;

      console.log('task Submitted', this.taskForm.value);
      this.taskForm.reset({ priority: 'Low', title: 'poda' });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onSelect(user: any): void {
    this.selectedUser = user;
  }

  getHttpData() {
    //    this.api.getData().subscribe({
    //     next: (res) => {
    //       this.httpResponse = res
    //     },
    //     error: (err) => console.log("some error with http", err)
    // })
    this.api
      .getData()
      .pipe(map((data) => data.slice(0, 3)))
      .subscribe({
        next: (res) => {
          this.httpResponse = res;
        },
        error: (err) => console.log('some error with http', err),
      });
  }

  getStaticData(): void {
    this.students = STUDENTS;
  }
}

//custom email validator function
function escapeRegex(str: string): string {
  //$&: special syntax in .replace() that means “the matched character so @gmail+com -> @gmail\\+com
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function customEmailValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value; //stores the input entered
    const escapedDomain = escapeRegex(domain);
    // $ at the end represents the end of string and i stand for case insensitive
    const domainPattern = new RegExp(`${escapedDomain}$`, 'i');

    return domainPattern.test(value)
      ? null
      : { invalidDomain: { requiredDomain: domain } };
  };
}

//custom phoneValidator

export function phoneValidator(): ValidatorFn {
  // ^ starting, + is replaced with /+ since it is optional adding ? and then containing 0-9 , 10-15 digits
  const pattern = /^\+?[0-9]{10,15}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return pattern.test(value) ? null : { invalidPhone: true };
  };
}
