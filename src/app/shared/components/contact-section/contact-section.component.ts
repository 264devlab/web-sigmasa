import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, I18nPipe, RevealDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent implements OnInit {
  contactForm!: FormGroup;
  selectedArea: string = 'hr';
  isSubmitting: boolean = false;

  private emailDestinations: Record<string, string> = {
    hr: '264devlab@gmail.com',
    commercial: 'gonzalobalderrama.it@gmail.com',
    suppliers: 'ismaterluk98@gmail.com'
  };

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
      area: ['hr']
    });
  }

  selectArea(area: string): void {
    this.selectedArea = area;
    this.contactForm.patchValue({ area });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const formData = this.contactForm.value;
      const destination = this.emailDestinations[this.selectedArea];

      const formspreeData = {
        ...formData,
        _to: destination,
        _subject: `Web Sigmasa - Nuevo contacto de ${formData.firstname} ${formData.lastname} (${this.selectedArea})`
      };

      this.http.post('https://formspree.io/f/mnjoqdjy', formspreeData, {
        headers: { 'Accept': 'application/json' }
      }).subscribe({
        next: () => {
          this.isSubmitting = false;
          alert('El mensaje se envió correctamente.');
          this.contactForm.reset({ area: this.selectedArea });
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error al enviar el formulario', error);
          alert('Hubo un error al enviar el mensaje. Inténtelo de nuevo más tarde.');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
