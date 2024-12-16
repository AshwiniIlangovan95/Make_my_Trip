import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../../../services/location.service';
import { CommonModule } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-home-tkt-bkng',
  standalone: true,
  imports: [
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatNativeDateModule,
            MatAutocompleteModule,
            ReactiveFormsModule,
            HttpClientModule,
            CommonModule,
            MatDatepickerModule,
          ],
  providers: [HttpClientModule],
  templateUrl: './home-tkt-bkng.component.html',
  styleUrl: './home-tkt-bkng.component.css'
})
export class HomeTktBkngComponent implements OnInit {

  public catagories:any[] = [
    {name:"Flight", icon:"fas fa-plane-departure"},
    {name:"Hotels", icon:"fas fa-plane-departure"},
    {name:"Homestays & Villas", icon:"fas fa-plane-departure"},
    {name:"Holiday Packages", icon:"fas fa-plane-departure"},
    {name:"Trains", icon:"fas fa-plane-departure"},
    {name:"Buses", icon:"fas fa-plane-departure"},
    {name:"Cabs", icon:"fas fa-plane-departure"},
    {name:"Forex Card & Currency", icon:"fas fa-plane-departure"},
    {name:"Travel Insurance", icon:"fas fa-plane-departure"},
   ]

  locations: any[] = [];
  classes: any[] = [];
  travelForm: FormGroup; // Reactive form group
  selectedCountry: any;
  filteredLocations: any[] = [];
  minDate: Date;
  selectedItem: string | undefined
  constructor(
    private locationService: LocationService,
    private fb: FormBuilder,
    private storeService: StoreService,
    private router: Router
  ) {
    this.travelForm = this.fb.group({
      fromStation: ['', Validators.required],
      toStation: ['', Validators.required],
      travelDate: ['', Validators.required],
      travelClass: ['All'],
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.locationService.getLocation().subscribe((data)=> {
      this.locations = data.locations;
      this.filteredLocations = data.locations;
    }, (err)=> {
      console.error('Error on loading locations', err)
    });
    
    this.locationService.getClasses().subscribe((data) => {
      this.classes = data.classes;
    }, (err) => {
      console.error("Error on loading classes", err)
    })
  }

  onSearch() {
    if (this.travelForm.valid) {
      this.storeService.setTravelDetails(this.travelForm.value);
      this.router.navigate(['/search-results']);
    } else {
      this.travelForm.markAllAsTouched();
    }
  }

  onFromStationChange(value: any) {
    this.filteredLocations = this.locations.filter(data=> data.name !== this.travelForm?.value?.fromStation);
    this.travelForm.controls['toStation'].reset();
  }
}