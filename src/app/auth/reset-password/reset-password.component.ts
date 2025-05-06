import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  token:any;
  data:any;

  constructor(private route: ActivatedRoute, private authService: AuthService, private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    
  }

 ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
       this.token = params['token']; 
    });

    this.data = {
      password: '',
      password_confirmation: '',
      token: this.token,
    };
  }


  onSubmit() {
    this.spinner.show();
    this.authService.resetPassword(this.data).subscribe(
      (response) => {
        this.toastr.success('Success', 'Password reset successfully', { closeButton: true, });
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error('Error', 'Failed to reset password', { closeButton: true, });
        this.spinner.hide();
      }
    );
  }
}
