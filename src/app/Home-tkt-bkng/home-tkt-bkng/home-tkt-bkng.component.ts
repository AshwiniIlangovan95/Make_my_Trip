import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../../../services/location.service';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { AutoComplete } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePicker } from 'primeng/datepicker';
import { Select, SelectItem } from 'primeng/select';

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
            MatDatepickerModule,
            MatAutocompleteModule,
            ReactiveFormsModule,
            HttpClientModule,
            CommonModule,
            AutoComplete,
            IftaLabelModule,
            DatePicker,
            Select
          ],
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
  filteredFromCities!: any;
  filteredToCities!: Observable<any[]>;
  fromControl = new FormControl('');
  countries:any;
  selectedCountry: any;
  filteredCountries: any;
  date:Date[] | undefined;
  trainClasses: SelectItem[] = [];
  selectedItem: string | undefined

  constructor(private locationService: LocationService,  private fb: FormBuilder) {
    
    this.travelForm = this.fb.group({
      fromCity: [''],
      toCity: [''],
      travelDate: [''],
      travelClass: ['All Classes'], // Default class
    });
  }

  ngOnInit(): void {
    this.getCountries();
    this.getClasses();
    this.locationService.getLocation().subscribe((data)=> {
      this.locations = data.locations;
      console.log("OnInit", this.locations)
      this.fromControl.valueChanges.subscribe(newValue=>{
        console.log("from control", newValue)
        this.filteredFromCities = this._filterCities(newValue);
        console.log("from control filtered",this.filteredFromCities )
      })

      this.filteredToCities = this.fromControl!.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCities(value|| ''))
      );
    }, (err)=> {
      console.error('Error on loading locations', err)
    });
    
    this.locationService.getClasses().subscribe((data) => {
      this.classes = data.classes;
      console.log(data, 'data')
    }, (err) => {
      console.error("Error on loading classes", err)
    })
  }

  getCountries(){
    this.locationService.getLocation().subscribe((data)=>{
      this.countries = data.locations
      console.log("getCountries", this.countries)
    })
  }
  getClasses(){
    this.locationService.getClasses().subscribe((data)=>{
      this.trainClasses = data.classes;
      console.log("getClasses", this.trainClasses)
    })
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
        let country = (this.countries as any[])[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
}

  private _filterCities(value: any): any[] {
    const filterValue = value.toLowerCase();
    console.log(this.filteredFromCities, this.filteredToCities, 'test', this.locations)
    return this.locations.filter((city) => city.name.toLowerCase().includes(filterValue));
  }
  onCitySelected(selectedCity: { id: number; name: string; value: string }) {
    console.log('Selected City:', selectedCity);
    // Use selectedCity.id or selectedCity.value as needed
  }
} 
