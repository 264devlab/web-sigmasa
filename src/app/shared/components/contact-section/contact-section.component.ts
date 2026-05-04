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

  cvFileBase64 = signal<string | null>(null);
  cvFileName = signal<string | null>(null);
  cvFileError = signal<string | null>(null);

  private georefService = inject(GeorefService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  private emailDestinations: Record<string, string> = {
    hr: 'hr',
    technical: 'technical',
    commercial: 'commercial',
    consulting: 'consulting'
  };

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), Validators.maxLength(25)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(15)]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      study_level: [''],
      worked_projects: [''],
      which_projects: [''],
      company: [''],
      message: ['', [Validators.required, Validators.maxLength(250)]],
      cv_file: [null],
      area: ['hr']
    });

    this.loadProvinces();
    this.setupProvinceSubscription();
    this.setupWorkedProjectsSubscription();

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

  private setupWorkedProjectsSubscription() {
    this.contactForm.get('worked_projects')?.valueChanges.subscribe(val => {
      const whichProjectsCtrl = this.contactForm.get('which_projects');
      if (this.selectedArea === 'hr' && val === 'yes') {
        whichProjectsCtrl?.setValidators([Validators.required]);
      } else {
        whichProjectsCtrl?.clearValidators();
      }
      whichProjectsCtrl?.updateValueAndValidity();
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
    this.contactForm.get('which_projects')?.clearValidators();
    this.contactForm.get('company')?.clearValidators();
    this.contactForm.get('cv_file')?.clearValidators();

    // Update validators based on area
    if (area === 'hr') {
      this.contactForm.get('study_level')?.setValidators([Validators.required]);
      this.contactForm.get('worked_projects')?.setValidators([Validators.required]);
      this.contactForm.get('cv_file')?.setValidators([Validators.required]);
    } else if (area === 'technical') {
      this.contactForm.get('company')?.setValidators([Validators.required]);
    }

    this.contactForm.get('study_level')?.updateValueAndValidity();
    this.contactForm.get('worked_projects')?.updateValueAndValidity();
    this.contactForm.get('which_projects')?.updateValueAndValidity();
    this.contactForm.get('company')?.updateValueAndValidity();
    this.contactForm.get('cv_file')?.updateValueAndValidity();
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;

    this.cvFileError.set(null);
    this.cvFileBase64.set(null);
    this.cvFileName.set(null);

    if (file) {
      if (file.type !== 'application/pdf') {
        this.cvFileError.set('Solo se permiten archivos PDF');
        this.contactForm.patchValue({ cv_file: null });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.cvFileError.set('El archivo no puede superar los 2MB');
        this.contactForm.patchValue({ cv_file: null });
        return;
      }

      this.cvFileName.set(file.name);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        this.cvFileBase64.set(base64Content);
      };
      reader.onerror = (error) => {
        this.cvFileError.set('Error al leer el archivo');
        this.contactForm.patchValue({ cv_file: null });
      };
    }
  }

  submitState = signal<'idle' | 'morphing' | 'loading' | 'finishing' | 'success' | 'error'>('idle');

  onSubmit(): void {
    if (this.contactForm.valid && this.submitState() === 'idle') {
      this.submitState.set('morphing');

      setTimeout(() => {
        this.submitState.set('loading');

        const formData: any = { ...this.contactForm.value };
        const selectedProv = this.provinces().find(p => p.id === formData.province);
        if (selectedProv) {
          formData.provinceName = selectedProv.nombre;
        }

        if (this.cvFileBase64()) {
          formData.cv_file_content = this.cvFileBase64();
          formData.cv_file_name = this.cvFileName();
        }

        this.http.post('/api/send-email', formData).subscribe({
          next: () => {
            this.submitState.set('finishing');
            setTimeout(() => {
              this.submitState.set('success');
              setTimeout(() => {
                this.submitState.set('idle');
                this.contactForm.reset({
                  lastname: '',
                  firstname: '',
                  email: '',
                  phone: '',
                  province: '',
                  city: '',
                  study_level: '',
                  worked_projects: '',
                  which_projects: '',
                  company: '',
                  message: '',
                  cv_file: null,
                  area: this.selectedArea
                });
                this.cvFileBase64.set(null);
                this.cvFileName.set(null);
                this.cvFileError.set(null);
                this.localities.set([]);
              }, 2500);
            }, 300);
          },
          error: (error) => {
            console.error('Error sending email', error);
            this.submitState.set('finishing');
            setTimeout(() => {
              this.submitState.set('error');
              setTimeout(() => {
                this.submitState.set('idle');
              }, 2500);
            }, 300);
          }
        });
      }, 400); // Wait for morphing animation

    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
