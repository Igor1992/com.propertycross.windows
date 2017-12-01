import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {CurrentLocationsService} from '../services/currentLocationsData.service';
import {SEARCH_HISTORY_KEY, COUNTRY_NAME_KEY, ERROR_CHOOSE_COUNTRY, COUNTRIES, AUTO_STR_SEARCH_VALUES} from '../appConfig/app.config';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


import {SearchLocation} from "../searchLocation";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  countries: any = COUNTRIES;
  autoStrSearchValues: string[] = AUTO_STR_SEARCH_VALUES;
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
    localStorage.setItem(COUNTRY_NAME_KEY, null);
    this.lastSearchLocations = localStorage.getItem(SEARCH_HISTORY_KEY)
      ? JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) : [];
  }

  getSearchLocatedByName(str: string) {
    if(!this.chosenCountry)
      return this.errorText = ERROR_CHOOSE_COUNTRY;
    localStorage.setItem(COUNTRY_NAME_KEY, this.chosenCountry);
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
    this.errorText = this.chosenCountry ? null : ERROR_CHOOSE_COUNTRY;
    if(this.errorText)
      return;
    localStorage.setItem(COUNTRY_NAME_KEY, this.chosenCountry);

    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.setLocations(position);
    });
  }

  goFavesPage() {
    this.router.navigate(['/favesObjects']);
  }

  setLocations(position){
    this.currentLocationsService.getData(position)
      .filter(data => !!(data && data.locations))
      .map(data => data.locations.map((loc: IDataLocation) => this.getTitleFormatted(loc)))
      .subscribe(locations => {
        if(locations.length == 0){
          this.errorText = 'There were no properties found for the given location.';
        }
        this.instructionText = "Please select a location below:";
        this.currentLocations = locations;
      });
  }

  getTitleFormatted(loc: IDataLocation){
    loc.long_title_formatted = loc.long_title.replace(",", "_");
    return loc;
  }

}
