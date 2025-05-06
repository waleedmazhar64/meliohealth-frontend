declare const bootstrap: any;
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import Swal from 'sweetalert2';
import { CurrentAuthUrl } from '../../app.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
	userName;
	profileImg;
	notes: any[]  = [];
	noteForm: FormGroup;
	emailForm: FormGroup;
	profileForm: FormGroup;
	passwordForm: FormGroup;
	cardForm: FormGroup;
	selectedNoteId: number | null = null;
	selectedPlan = '';
	cards: any[] = [];

	userImage: string = '';
	defaultImage = 'assets/images/main-profile.png';
	showCVV: { [cardId: number]: boolean } = {};

	constructor(private notesService: NotesService, 
		private fb: FormBuilder,
		private spinner: NgxSpinnerService,
    	private toastr: ToastrService,
    	private router: Router,
    	private route: ActivatedRoute,) {
	  
	  
	  this.userName = localStorage.getItem('name');
	  this.profileImg = `${CurrentAuthUrl}/storage/profile_images/${localStorage.getItem('profile_image')}`;

	  this.noteForm = this.fb.group({
	    patient_name: ['', Validators.required],
	    dob: ['', Validators.required],
	    symptoms: ['', Validators.required],
	    evaluation: ['', Validators.required],
	    bp: ['', Validators.required],
	    oxygen: ['', Validators.required],
	    observation: ['', Validators.required]
	  });

	  this.emailForm = this.fb.group({
	    name: ['', Validators.required],
  		email: ['', [Validators.required, Validators.email]],
  		description: ['', Validators.required],
	  });

	  this.profileForm = this.fb.group({
	    name: ['', Validators.required],
	    email: ['', [Validators.required, Validators.email]]
	  });

	  this.passwordForm = this.fb.group({
	    current_password: ['', Validators.required],
	    new_password: ['', Validators.required],
	    new_password_confirmation: ['', Validators.required]
	  });

	  this.cardForm = this.fb.group({
	  cardholder_name: ['', Validators.required],
	  card_number: ['', Validators.required],
	  expiry_date: ['', Validators.required],
	  cvv: ['', Validators.required],
	});
	}

	ngOnInit() {
	  this.loadNotes();
	  this.loadProfile();
	  this.loadCards();
  	  this.loadSubscription();
	}

	loadNotes() {
		this.spinner.show();
	  this.notesService.getNotes().subscribe((res: any) => {
	    	this.notes = res.notes;
	    	this.spinner.hide();
	 	 });
	}

	loadProfile() {
	  this.notesService.getProfile().subscribe((profile: any) => {
	    this.profileForm.patchValue(profile);
	    
	   	localStorage.setItem('profile_image', profile.profile_image);
	   	this.profileImg = `${CurrentAuthUrl}/storage/profile_images/${localStorage.getItem('profile_image')}`;


	    this.userImage = profile.profile_image
      ? `${CurrentAuthUrl}/storage/profile_images/${profile.profile_image}`
      : this.defaultImage;

	  });
	}

	loadCards() {
	  this.notesService.getCards().subscribe((res: any) => {
	    	this.cards = res.cards;
	    	this.spinner.hide();
	 	 });
	}

	loadSubscription() {
	  this.notesService.getSubscription().subscribe((sub: any) => {
	    this.selectedPlan = sub?.plan || '';
	  });
	}

	createNote() {
		this.spinner.show();
	  if (this.noteForm.invalid) return;
	  this.notesService.createNote(this.noteForm.value).subscribe(() => {
	    this.toastr.success('Note created');
	    this.loadNotes();
	    this.noteForm.reset();
	    this.spinner.hide();
	  });
	}

	confirmDeleteNote(id: number) {
	  this.selectedNoteId = id;
	  //const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
	  //modal.show();
	}

	deleteNote() {
		
	  if (!this.selectedNoteId) return;
	  this.spinner.show();
	  this.notesService.deleteNote(this.selectedNoteId).subscribe(() => {
	    this.toastr.success('Note deleted');
	    this.loadNotes();
	    const modal = document.getElementById('deleteModal');
	    const bsModal = bootstrap.Modal.getInstance(modal);
	    bsModal?.hide();

	    this.selectedNoteId = null;
	  });
	}

	openEmailModal(note: any) {
	  this.selectedNoteId = note.id;
	}

	sendEmail() {
		
	  if (!this.selectedNoteId || this.emailForm.invalid) return;
	  this.spinner.show();
	  this.notesService.sendNoteEmail(this.selectedNoteId, this.emailForm.value).subscribe(() => {
	    this.toastr.success('Note emailed');
	    this.emailForm.reset();
	    this.spinner.hide();
	  });
	}

	downloadNote(note: any) {
		this.spinner.show();
	  this.notesService.downloadNote(note.id).subscribe(blob => {
	    const link = document.createElement('a');
	    link.href = window.URL.createObjectURL(blob);
	    link.download = `note_${note.id}.txt`;
	    link.click();
	    this.spinner.hide();
	  });
	}

	printNote(note: any) {
	  const content = `
	    Patient Name: ${note.patient_name}
	    DOB: ${note.dob}
	    
	    Symptoms:
	    ${note.symptoms}
	    
	    Evaluation:
	    ${note.evaluation}
	    
	    BP: ${note.bp}
	    Oxygen: ${note.oxygen}
	    
	    Observations:
	    ${note.observation}
	  `;

	  const w = window.open('', '_blank');

	  if (w) {
	    w.document.write('<pre>' + content + '</pre>');
	    w.document.close(); // Required for some browsers
	    w.focus(); // Bring window to front
	    w.print();
	    w.close();
	  } else {
	    this.toastr.error('Unable to open print window. Please check your popup blocker.');
	  }
	}

	onFileSelected(event: any) {
	  const file: File = event.target.files[0];
	  if (file) {
	    this.notesService.uploadProfileImage(file).subscribe((res) => {
	      this.userImage = res.image_url;
	      this.profileImg = res.image_url;
	      this.toastr.success('Profile image updated');
	    });
	  }
	}

	updateProfile() {
		this.spinner.show();
	  this.notesService.updateProfile(this.profileForm.value).subscribe(() => {
	    this.toastr.success('Profile updated');
	    this.userName = this.profileForm.value.name;
    	localStorage.setItem('name', this.profileForm.value.name);
	    this.spinner.hide();
	  });
	}

	changePassword() {
		this.spinner.show()
	  if (this.passwordForm.invalid) return;
	  this.notesService.changePassword(this.passwordForm.value).subscribe({
	    next: () => {
	      this.toastr.success('Password changed');
	      this.passwordForm.reset();
	      this.spinner.hide();
	    },
	    error: (err) => {
	      this.toastr.error(err.error?.message || 'Failed to update password');
	      this.spinner.hide();
	    }
	  });
	}

	changePlan(plan: string) {
		this.spinner.show();
	  if (this.selectedPlan === plan) {
	    // Cancel selected plan
	    this.notesService.updateSubscription('').subscribe(() => {
	      this.selectedPlan = '';
	      this.toastr.success('Plan cancelled');
	      this.spinner.hide();
	    });
	  } else {
	    // Subscribe to new plan
	    this.notesService.updateSubscription(plan).subscribe(() => {
	      this.selectedPlan = plan;
	      this.toastr.success('Plan updated');
	      this.spinner.hide();
	    });
	  }
	}

	addCard() {
	  if (this.cardForm.invalid) return;
	  this.notesService.addCard(this.cardForm.value).subscribe(() => {
	    this.toastr.success('Card added');
	    this.cardForm.reset();
	    this.loadCards();
	  });
	}

	setActiveCard(id: number) {
		this.spinner.show();
	  this.notesService.activateCard(id).subscribe(() => {
	    this.toastr.success('Card activated');
	    this.loadCards();
	    this.spinner.hide();
	  });
	}

	toggleCVV(cardId: number) {
	  this.showCVV[cardId] = !this.showCVV[cardId];
	}

	logout() {
	  // Clear user-related data
	  localStorage.removeItem('token');
	  localStorage.removeItem('name');
	  localStorage.removeItem('role');

	  // Optionally clear any other app-specific data
	  localStorage.clear();

	  // Redirect to login or home
	  this.router.navigate(['/login']);
	}

}
