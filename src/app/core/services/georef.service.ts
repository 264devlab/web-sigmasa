import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

export interface GeorefItem {
  id: string;
  nombre: string;
}

export interface GeorefResponse {
  provincias?: GeorefItem[];
  localidades?: GeorefItem[];
  municipios?: GeorefItem[];
}

@Injectable({
  providedIn: 'root'
})
export class GeorefService {
  private http = inject(HttpClient);
  private baseUrl = 'https://apis.datos.gob.ar/georef/api';

  getProvincias(): Observable<GeorefItem[]> {
    return this.http.get<GeorefResponse>(`${this.baseUrl}/provincias?campos=id,nombre`).pipe(
      map(res => (res.provincias || []).sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }

  getLocalidades(provinciaId: string): Observable<GeorefItem[]> {
    if (!provinciaId) return of([]);
    return this.http.get<GeorefResponse>(`${this.baseUrl}/localidades?provincia=${provinciaId}&campos=id,nombre&max=5000`).pipe(
      map(res => (res.localidades || []).sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }
}
