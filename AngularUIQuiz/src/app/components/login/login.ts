import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink, 
    ReactiveFormsModule, 
    CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['' , Validators.required]
    });
  }

  onSubmit(){

    if(this.loginForm.valid){

    }else{
      ValidateForm.validateAllFormFileds(this.loginForm);
    }
  }
}
