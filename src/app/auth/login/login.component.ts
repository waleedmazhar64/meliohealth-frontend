import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
  	private authService: AuthService, 
  	private router: Router,
  	private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    ) {}

  login() {
  this.spinner.show();

  this.authService.login({ email: this.email, password: this.password }).subscribe(
    (response) => {
      this.spinner.hide();

      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.user.name);
      localStorage.setItem('role', response.user.role);

      this.toastr.success('Success', 'User logged in successfully', { closeButton: true });

      if (response.user.role === 'admin' || response.user.role === 'provider') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/patient']);
      }
    },
    (error) => {
      this.spinner.hide();

      if (error.status === 403 && error.error?.message === 'Please verify your account.') {
        this.toastr.warning('Account Not Verified', error.error.message, { closeButton: true });
      } else if (error.status === 401) {
        this.toastr.error('Invalid Credentials', 'Login failed. Please check your credentials.', { closeButton: true });
      } else {
        this.toastr.error('Error', 'An unexpected error occurred.', { closeButton: true });
      }
    }
  );
}

}
