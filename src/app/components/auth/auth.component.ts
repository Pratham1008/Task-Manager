import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  private authService =  inject(AuthenticationService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
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
}
