import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private travelDetails = {};

  constructor() { }

  public setTravelDetails(details: any) {
    this.travelDetails = details;
  }

  public getTravelDetails() {
    return this.travelDetails;
  }
}