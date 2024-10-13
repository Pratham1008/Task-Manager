import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  private authService =  inject(AuthenticationService);
  private router = inject(Router);
  private users : any;
  isLogin = true;

  form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  signIn(){
    let email  = this.form.value.email;
    let password = this.form.value.password;
    this.authService.login(email,password).subscribe(res => {
      this.authService.setCookie(res.token);
      if (typeof email === "string") {
        localStorage.setItem('username', email);
      }
      window.location.reload();
    });
  }

  signUp(){
    this.users = this.signUpForm.value;
    this.authService.register(this.users).subscribe(res => {
      window.location.reload();
    });
  }
}
