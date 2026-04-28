import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { RevealDirective } from '../../directives/reveal.directive';
import { GeorefService, GeorefItem } from '../../../core/services/georef.service';
import { HttpClient } from '@angular/common/http';

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

  provinces = signal<GeorefItem[]>([]);
  localities = signal<GeorefItem[]>([]);
  isLoadingLocalities = signal(false);

  private georefService = inject(GeorefService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  /* private emailDestinations: Record<string, string> = {
    hr: 'psanchez@sigmasa.com',
    technical: 'tecnica@sigmasa.com',
    commercial: 'compras@sigmasa.com',
    consulting: 'sigma@sigmasa.com'
  }; */

  private emailDestinations: Record<string, string> = {
    hr: 'hr',
    technical: 'technical',
    commercial: 'commercial',
    consulting: 'consulting'
  };

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      study_level: [''],
      worked_projects: [''],
      which_projects: [''],
      company: [''],
      message: [''],
      area: ['hr']
    });

    this.loadProvinces();
    this.setupProvinceSubscription();

    // Default validators for 'hr'
    this.selectArea('hr');
  }

  private loadProvinces() {
    this.georefService.getProvincias().subscribe(data => {
      this.provinces.set(data);
    });
  }

  private setupProvinceSubscription() {
    this.contactForm.get('province')?.valueChanges.subscribe(provId => {
      this.contactForm.patchValue({ city: '' });
      this.localities.set([]);

      if (provId) {
        this.isLoadingLocalities.set(true);
        this.georefService.getLocalidades(provId).subscribe(data => {
          this.localities.set(data);
          this.isLoadingLocalities.set(false);
        });
      }
    });
  }

  selectArea(area: string): void {
    this.selectedArea = area;
    this.contactForm.patchValue({ area });

    // Reset specialized fields
    this.contactForm.patchValue({
      study_level: '',
      worked_projects: '',
      which_projects: '',
      company: ''
    });

    // Clear all specialized validators first
    this.contactForm.get('study_level')?.clearValidators();
    this.contactForm.get('worked_projects')?.clearValidators();
    this.contactForm.get('company')?.clearValidators();

    // Update validators based on area
    if (area === 'hr') {
      this.contactForm.get('study_level')?.setValidators([Validators.required]);
      this.contactForm.get('worked_projects')?.setValidators([Validators.required]);
    } else if (area === 'technical') {
      this.contactForm.get('company')?.setValidators([Validators.required]);
    }

    this.contactForm.get('study_level')?.updateValueAndValidity();
    this.contactForm.get('worked_projects')?.updateValueAndValidity();
    this.contactForm.get('company')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const destination = this.emailDestinations[this.selectedArea];

      const formData = this.contactForm.value;
      //console.log(formData);

      this.http.post('/api/send-email', formData).subscribe({
        next: (response) => {
          alert(`Mensaje enviado a: ${formData.destination}`);
          this.contactForm.reset({ area: this.selectedArea });
        },
        error: (error) => {
          console.error('Error sending email', error);
          alert('Error al enviar el mensaje');
        }
      });

    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
