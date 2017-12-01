import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {CurrentLocationsService} from '../services/currentLocationsData.service';
import {searchHistoryKey, countryNameKey, errorChooseCountry, countries, autoStrSearchValues} from '../appConfig/app.config';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


import {SearchLocation} from "../searchLocation";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  countries: any = countries;
  autoStrSearchValues: string[] = autoStrSearchValues;
  chosenCountry: string;
  instructionText: string;
  errorText: string;
  strSearch: string;
  lastSearchLocations: SearchLocation[];
  currentLocations: IDataLocation[];

  constructor(private router: Router, private customLocationsService: CustomLocationsService,
              private currentLocationsService: CurrentLocationsService) {
    this.instructionText = "Recent searches:";
  }

  ngOnInit() {
    localStorage.setItem(countryNameKey, null);
    this.lastSearchLocations = localStorage.getItem(searchHistoryKey)
      ? JSON.parse(localStorage.getItem(searchHistoryKey)) : [];
  }

  getSearchLocatedByName(str: string) {
    if(!this.chosenCountry)
      return this.errorText = errorChooseCountry;
    localStorage.setItem(countryNameKey, this.chosenCountry);
    let numStartPage = 1;
    this.customLocationsService.getData(str, numStartPage).subscribe(data => {
      if (data.listings.length > 0) {
        this.router.navigate(['/searchResults'], {queryParams: {strSearch: str}});
      } else {
        this.errorText = "There was a problem with your search";
        return;
      }
    });
  }

  getCurrentLocations() {
    this.chosenCountry ? this.errorText = null : this.errorText = errorChooseCountry;
    if(this.errorText)
      return;
    localStorage.setItem(countryNameKey, this.chosenCountry);
    console.log('component: get data');

    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.currentLocationsService.getData(position)
      .filter(data => !!(data && data.locations))
      .map(data => data.locations.map((loc: IDataLocation) => {
        console.log('component: map');
        loc.long_title_formatted = loc.long_title.replace(",", "_");
        return loc;
      }))
      .subscribe((locations => {
        console.log('component: subscribe');
        if(locations.length == 0 || !this.currentLocations){
          this.errorText = 'There were no properties found for the given location.';
        }
        this.instructionText = "Please select a location below:";
        this.currentLocations = locations;
      }));
    });
  }

  goFavesPage() {
    this.router.navigate(['/favesObjects']);
  }

}
