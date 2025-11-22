import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-register',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent implements OnInit {
  
  registerForm!:FormGroup
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['' , Validators.required],
      confirmpassword: ['' , Validators.required]
    });
  }

  onRegister(){

    if(this.registerForm.valid){

    }else{
     ValidateForm.validateAllFormFileds(this.registerForm);
    }
  }
}
