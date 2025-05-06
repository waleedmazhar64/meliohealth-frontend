import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentApiUrl } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
	private api = CurrentApiUrl;

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get(`${this.api}/notes`);
  }

  createNote(data: any) {
    return this.http.post(`${this.api}/notes`, data);
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.api}/notes/${id}`);
  }

  sendNoteEmail(id: number, payload: { to: string }) {
    return this.http.post(`${this.api}/notes/${id}/email`, payload);
  }

  downloadNote(id: number) {
    return this.http.get(`${this.api}/notes/${id}/download`, {
      responseType: 'blob'
    });
  }

  getProfile() {
    return this.http.get(`${this.api}/profile`);
  }

  updateProfile(data: any) {
    return this.http.post(`${this.api}/profile`, data);
  }

  changePassword(data: any) {
    return this.http.post(`${this.api}/password`, data);
  }

  getSubscription() {
	  return this.http.get(`${this.api}/subscriptions`);
	}

	updateSubscription(plan: string) {
	  return this.http.post(`${this.api}/subscriptions`, { plan });
	}

	getCards() {
	  return this.http.get(`${this.api}/cards`);
	}

	addCard(cardData: any) {
	  return this.http.post(`${this.api}/cards`, cardData);
	}

	uploadProfileImage(file: File) {
	  const formData = new FormData();
	  formData.append('image', file);
	  return this.http.post<{ image_url: string }>(`${this.api}/profile/image`, formData);
	}

	activateCard(id: number) {
	  return this.http.post(`${this.api}/cards/${id}/activate`, {});
	}

}
