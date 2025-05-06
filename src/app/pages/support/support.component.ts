import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrentApiUrl } from '../../app.config';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})

export class SupportComponent {

	form: FormGroup;

	constructor(private fb: FormBuilder, private http: HttpClient, 
		private toastr: ToastrService, private spinner: NgxSpinnerService) {
	  
	  this.form = this.fb.group({
	    name: ['', Validators.required],
	    email: ['', [Validators.required, Validators.email]],
	    message: ['', Validators.required]
	  });
	}

	submitSupport() {
	  if (this.form.invalid) return;

	  this.spinner.show(); // ✅ show spinner

	  this.http.post(CurrentApiUrl + '/contact-support', this.form.value).subscribe({
	    next: () => {
	      this.toastr.success('Message sent successfully!');
	      this.spinner.hide(); // ✅ hide spinner
	      this.form.reset(); // optional: clear form
	    },
	    error: () => {
	      this.toastr.error('Something went wrong.');
	      this.spinner.hide(); // ✅ hide spinner
	    }
	  });
	}


}
