import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

	users: any[] = [];
	form: FormGroup;
	userName;

	constructor(private adminService: AdminService, 
		private fb: FormBuilder,
		private spinner: NgxSpinnerService,
    	private toastr: ToastrService,
    	private router: Router,
    	private route: ActivatedRoute,) {
	  
	  this.form = this.fb.group({
	    free_plan: ['', Validators.required],
	    premium_plan: ['', Validators.required],
	  });
	  this.userName = localStorage.getItem('name');
	}

	ngOnInit() {
	  this.loadUsers();
	  this.loadPlans();
	}

	loadUsers() {
		this.spinner.show();
	  	this.adminService.getUsers().subscribe((res: any) => {
	    	this.users = res.users;
	    	this.spinner.hide();
	 	 });
	}

	loadPlans() {
	  this.adminService.getPlans().subscribe((res) => {
	    this.form.patchValue({
	      free_plan: res.free_plan,
	      premium_plan: res.premium_plan
	    });
	  });
	}

	updatePlans() {
	  if (this.form.invalid) return;
	  this.spinner.show();
	  this.adminService.updatePlans(this.form.value).subscribe(() => {
	      this.toastr.success('Success', 'Plans Updated', { closeButton: true });
	      this.loadPlans();
	      this.spinner.hide();
	    });

	}

	logout() {
	  localStorage.clear();
	  this.router.navigate(['/login']);
	}

	viewUser(user: any) {
	  Swal.fire({
	    title: `${user.name}`,
	    html: `
	      <p><strong>Email:</strong> ${user.email}</p>
	      <p><strong>Status:</strong> ${user.status}</p>
	    `,
	    icon: 'info',
	    confirmButtonText: 'Close'
	  });
	}

	deleteUser(user: any) {
	  Swal.fire({
	    title: 'Delete User',
	    text: `Are you sure you want to delete ${user.name}?`,
	    icon: 'warning',
	    showCancelButton: true,
	    confirmButtonText: 'Yes, delete',
	    cancelButtonText: 'Cancel',
	    confirmButtonColor: '#d33',
	    cancelButtonColor: '#6c757d'
	  }).then((result) => {
	    if (result.isConfirmed) {
	      this.adminService.deleteUser(user.id).subscribe(() => {
	        this.toastr.success('User deleted');
	        this.loadUsers();
	      });
	    }
	  });
	}

	toggleUserStatus(user: any) {
	  const action = user.status === 'active' ? 'inactive' : 'active';

	  Swal.fire({
	    title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
	    text: `Are you sure you want to ${action} ${user.name}?`,
	    icon: 'question',
	    showCancelButton: true,
	    confirmButtonText: `Yes, ${action}`,
	    cancelButtonText: 'Cancel',
	    confirmButtonColor: '#3085d6',
	    cancelButtonColor: '#6c757d'
	  }).then((result) => {
	    if (result.isConfirmed) {
	      this.adminService.toggleStatus(user.id).subscribe(() => {
	        this.toastr.success(`User ${action}d`);
	        this.loadUsers();
	      });
	    }
	  });
	}

}
