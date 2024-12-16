import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LocationService } from '../../../services/location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CardModule,
              HttpClientModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{

  public journeyClassFilters:any;
  public arrivalToK:any;


  constructor(
          private http:HttpClient,
          private resultService:LocationService,
          ){

  }

  ngOnInit(){
    this.getResultData();
  }


  getResultData(){
    this.resultService.getResults().subscribe((data)=>{
      this.journeyClassFilters = data.journeyClassFilters;
      this.arrivalToK = data.arrivalToKanpur;
      console.log("getResultData - ", this.journeyClassFilters,this.arrivalToK)
    })
  }

}
