import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ServiceResponse } from '../services/service-response.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const email = this.registerForm.get('email').value;

    const userRegister = { username, password, email };

    this.authService.registerAndLogin(userRegister)
      .pipe(
        catchError((error) => {
          this.errorMessage = "Error: Invalid Username or email.";
          return of(null);
        })
      )
      .subscribe(
        (response: ServiceResponse<any>) => {
          if (response && response.success) {
            this.router.navigate(['/']);
          }
        }
      );
  }
}
