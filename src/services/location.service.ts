import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationUrl = 'assets/locations.json';
  private classesUrl = 'assets/classes.json';

  constructor(private http: HttpClient) { }

  getLocation(): Observable<any> {
    return this.http.get<any>(this.locationUrl);
  }

  getClasses(): Observable<any> {
    return this.http.get<any>(this.classesUrl)
  }
}
