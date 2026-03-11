import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, I18nPipe],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent implements OnInit {
  contactForm!: FormGroup;
  selectedArea: string = 'hr';

  private emailDestinations: Record<string, string> = {
    hr: 'rrhh@sigmasa.com.ar',
    commercial: 'comercial@sigmasa.com.ar',
    suppliers: 'proveedores@sigmasa.com.ar'
  };

  constructor(private fb: FormBuilder) {}

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
      const destination = this.emailDestinations[this.selectedArea];
      console.log(`Sending email to: ${destination}`, this.contactForm.value);
      // Logic: integrate with a backend service or EmailJS
      // this.contactService.send(this.contactForm.value, destination).subscribe(...)
      
      alert(`Mensaje enviado a: ${destination}`);
      this.contactForm.reset({ area: this.selectedArea });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
