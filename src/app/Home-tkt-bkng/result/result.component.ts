import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
              HttpClientModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{

  public journeyClassFilters:any;
  public arrivalToK:any;
  public trainSchedules: any;
  public travelDetails: any;

  constructor(
          private router:Router,
          private locationService:LocationService,
          private storeService: StoreService
          ){
  }

  ngOnInit(){
    this.travelDetails = this.storeService.getTravelDetails();
    this.getResultData();
    this.getTrainScheduleData();
    if(!this.travelDetails?.toStation) {
      this.router.navigate(['']);
    }
  }

  getResultData(){
    this.locationService.getResults().subscribe((data)=>{
      this.journeyClassFilters = data.journeyClassFilters;
      this.arrivalToK = data.arrivalToKanpur;
    })
  }

  getTrainScheduleData() {
    this.locationService.getTrainSchedules().subscribe((data) => {
      this.trainSchedules = data;
    })
  }

}