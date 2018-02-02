import { Injectable } from '@angular/core';
import { ReportClass } from 'app/models/ReportClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getByVisitId(visitId: number): Observable<ReportClass> {
    return this.http.get<ReportClass>(`/backend/visits/${visitId}/report`);
  }

  postReport(visitId: number, report: ReportClass): Observable<any> {
    return this.http.post(`/backend/visits/${visitId}/report`, report, { responseType: 'text'});
  }

}
