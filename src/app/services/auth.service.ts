// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentApiUrl } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = CurrentApiUrl;

  constructor(private http: HttpClient) {}


  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  registerAdmin(data: any): Observable<any> {
    return this.http.post(`${this.api}/admin/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.api}/forgot-password`, { email });
  }

  resetPassword(data: any) {
    return this.http.post(`${this.api}/reset-password`, data);
  }

  verifyOtp(data: any): Observable<any> {
	  return this.http.post(`${this.api}/verify-otp`, data);
	}

	resendOtp(data: { email: string }): Observable<any> {
  	return this.http.post(`${this.api}/resend-otp`, data);
	}	

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
