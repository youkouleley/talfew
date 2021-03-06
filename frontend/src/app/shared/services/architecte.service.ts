import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchitectClass } from '@weflat/app/core/models/ArchitectClass';
import { DashboardClass } from '@weflat/app/core/models/DashboardClass';
import { ZipCodeClass } from '@weflat/app/core/models/ZipCodeClass';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArchitectService {

  constructor(private http: HttpClient) { }


  postArchitecte(architecte: ArchitectClass) {
    return this.http.post<ArchitectClass>('/architects', architecte).pipe(
      map(res => new ArchitectClass(res))
    );
  }

  patchArchitecte(architecte: ArchitectClass, architecteId: number) {
    return this.http.patch<ArchitectClass>(`/architects/${architecteId}`, architecte).pipe(
      map(res => new ArchitectClass(res))
    );
  }

  getArchitecte(id: number) {
    return this.http.get<ArchitectClass>(`/architects/${id}`).pipe(
      map(res => new ArchitectClass(res))
    );
  }

  getAll() {
    return this.http.get<ArchitectClass[]>('/architects').pipe(
      map(res => res.map(item => new ArchitectClass(item)))
    );
  }

  postZipCodes(zipCodes: ZipCodeClass[], id: number) {
    return this.http.post(`/architects/${id}/zip-codes`, zipCodes);
  }

  getZipCodes(id: number): Observable<ZipCodeClass[]> {
    return this.http.get<ZipCodeClass[]>(`/architects/${id}/zip-codes`).pipe(
      map(res => res.map(x => new ZipCodeClass(x)))
    );
  }

  accept(id: number): Observable<any> {
    return this.http.post(`/architects/${id}/accept`, null);
  }

  refuse(id: number): Observable<any> {
    return this.http.post(`/architects/${id}/refuse`, null);
  }

  getDashboard(id: number): Observable<DashboardClass> {
    return this.http.get<DashboardClass>(`/architects/${id}/dashboard`).pipe(
      map(res => new DashboardClass(res))
    );
  }
}
