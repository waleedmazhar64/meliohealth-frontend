import { Injectable } from '@angular/core';
import { CurrentApiUrl } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
	private api = CurrentApiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.api}/admin/users`);
  }

  getPlans() {
	return this.http.get<any>(`${this.api}/admin/plans`);
  }

  updatePlans(data: any) {
    return this.http.post(`${this.api}/admin/plans`, data);
  }

  deleteUser(userId: number) {
	  return this.http.delete(`${this.api}/admin/users/${userId}`);
  }

  toggleStatus(userId: number) {
	  return this.http.post(`${this.api}/admin/users/${userId}/toggle-status`, {});
  }
}
