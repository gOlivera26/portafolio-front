import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { ContactForm } from '../models/contact-form.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contactoForm: FormGroup;
  loading = false; // Variable para controlar la visualización de la barra de progreso

  constructor(
    private fb: FormBuilder,
    private cvService: CvService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/\b[A-Za-z0-9._%+-]+@(?:gmail|hotmail)\.com\b/)]],
      mensaje: ['', Validators.required]
    });
  }

  enviarMensaje(): void {
    if (this.contactoForm.valid) {
      const nombre = this.contactoForm.get('nombre').value;
      const correo = this.contactoForm.get('correo').value;
      const mensaje = this.contactoForm.get('mensaje').value;

      const contactForm = new ContactForm(nombre, correo, mensaje);

      Swal.fire(
        'Enviando correo...',
        'Esto puede tomar unos momentos, por favor espere...',
        'info'
      ); //Mensaje de espera hasta que se encienda el backend en Render
      Swal.showLoading(); // Mostrar el indicador de carga
      this.loading = true; 
      
      this.cvService.sendEmail(contactForm).subscribe(
        response => {
          console.log('Correo enviado con éxito:', response);
          Swal.fire({
            icon: 'success',
            title: '¡Correo enviado con éxito!',
            text: 'Gracias por contactarte!'
          });
          this.contactoForm.reset();
          this.loading = false; 
        },
        error => {
          console.error('Error al enviar el correo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.'
          });
          this.loading = false; 
        }
      );
    } else {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      Object.keys(this.contactoForm.controls).forEach(controlName => {
        this.contactoForm.get(controlName).markAsTouched();
      });
    }
  }
}
