import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	standalone: false,
  	selector: 'app-register',
  	templateUrl: './register.component.html'
})

export class RegisterComponent {
  form: FormGroup;
  isAdmin = false;
  otpForm: FormGroup;
	showOtp = false;
	emailForOtp = '';
	resendDisabled = true;
	resendCountdown = 60;
	countdownInterval: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.isAdmin = this.route.snapshot.routeConfig?.path?.includes('admin') ?? false;

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      role: this.isAdmin ? ['admin', Validators.required] : null,
    });

    this.otpForm = this.fb.group({
	    otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
	  });
  }

  register() {
	  this.spinner.show();

	  this.authService.register(this.form.value).subscribe(
	    (response) => {
	      this.spinner.hide();
	      this.toastr.success('OTP Sent', 'Check your email for the OTP.', { closeButton: true });

	      this.emailForOtp = this.form.value.email;
	      this.showOtp = true; // switch to OTP form
	      this.startResendCountdown();
	    },
	    (error) => {
	      this.spinner.hide();
	      if (error.status === 422 && error.error.errors) {
		    const errors = error.error.errors;

		    Object.keys(errors).forEach(field => {
		      errors[field].forEach((message: string) => {
		        this.toastr.error(message, 'Validation Error', { closeButton: true });
		      });
		    });
		  } else {
		    this.toastr.error('An unexpected error occurred.', 'Error', { closeButton: true });
		  }
	    }
	  );
	}

	verifyOtp() {
	  this.spinner.show();

	  const payload = {
	    email: this.emailForOtp,
	    otp: this.otpForm.value.otp
	  };

	  this.authService.verifyOtp(payload).subscribe(
	    (response) => {
	      this.spinner.hide();

	      localStorage.setItem('token', response.token);
	      localStorage.setItem('name', response.user.name);
	      localStorage.setItem('role', response.user.role);

	      this.toastr.success('Verified', 'OTP verified successfully', { closeButton: true });

	      if (response.user.role === 'admin' || response.user.role === 'provider') {
	        this.router.navigate(['/admin']);
	      } else {
	        this.router.navigate(['/patient']);
	      }
	    },
	    (error) => {
	      this.spinner.hide();
	      this.toastr.error('Error', 'Invalid or expired OTP', { closeButton: true });
	    }
	  );
	}

	resendOtp(event: Event) {
	  event.preventDefault();
	  if (this.resendDisabled) return;

	  this.spinner.show();

	  this.authService.resendOtp({ email: this.emailForOtp }).subscribe(
	    () => {
	      this.spinner.hide();
	      this.toastr.success('OTP Resent', 'Check your email again.');
	      this.startResendCountdown();
	    },
	    () => {
	      this.spinner.hide();
	      this.toastr.error('Failed to resend OTP');
	    }
	  );
	}

	ngOnDestroy() {
	  if (this.countdownInterval) {
	    clearInterval(this.countdownInterval);
	  }
	}


	cancelOtp() {
	  this.showOtp = false;
	  this.form.reset();
	}

	startResendCountdown() {
	  this.resendDisabled = true;
	  this.resendCountdown = 60;

	  if (this.countdownInterval) {
	    clearInterval(this.countdownInterval);
	  }

	  this.countdownInterval = setInterval(() => {
	    this.resendCountdown--;

	    if (this.resendCountdown <= 0) {
	      clearInterval(this.countdownInterval);
	      this.resendDisabled = false;
	    }
	  }, 1000);
	}

}
