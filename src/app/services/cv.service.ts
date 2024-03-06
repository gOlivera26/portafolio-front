import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactForm } from '../models/contact-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private http: HttpClient) {
  }


  sendEmail(contactForm: ContactForm): Observable<string> {
    return this.http.post('https://portafolio-backend-latest.onrender.com/send-email', contactForm, { responseType: 'text' });
  }
}
