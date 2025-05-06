import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})

export class ForgotPasswordComponent {
  email = '';
  constructor(private authService: AuthService, private spinner: NgxSpinnerService,
    private toastr: ToastrService) {}

  onSubmit() {
    this.spinner.show();
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        this.toastr.success('Success', 'Reset link sent to your email', { closeButton: true, });
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error('Error', 'Failed to send reset link', { closeButton: true, });
        this.spinner.hide();
      }
    );
  }
}
