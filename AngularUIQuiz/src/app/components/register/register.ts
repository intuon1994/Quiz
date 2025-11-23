import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

constructor(private fb: FormBuilder) { }

ngOnInit(): void {
  this.registerForm = this.fb.group(
    {
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator }
  );
}

passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmpassword')?.value;

  if (password !== confirmPassword) {
    form.get('confirmpassword')?.setErrors({ mismatch: true });
  } else {
    if (form.get('confirmpassword')?.errors?.['mismatch']) {
      form.get('confirmpassword')?.setErrors(null);
    }
  }
}

onRegister() {
  if (this.registerForm.valid) {
    console.log("Register data:", this.registerForm.value);
  } else {
    ValidateForm.validateAllFormFileds(this.registerForm);
  }
}

}
