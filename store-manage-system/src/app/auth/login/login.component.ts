import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onLogin() {
    this.isLoading = true;
    console.log('login');
  }
}
