import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {CurrentLocationsService} from '../services/currentLocationsData.service';
import * as Config from '../appConfig/app.config';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {SearchLocation} from "../searchLocation";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  countries: any = Config.COUNTRIES;
  autoStrSearchValues: string[] = Config.AUTO_STR_SEARCH_VALUES;
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
    localStorage.setItem(Config.COUNTRY_NAME_KEY, null);
    this.lastSearchLocations = localStorage.getItem(Config.SEARCH_HISTORY_KEY)
      ? JSON.parse(localStorage.getItem(Config.SEARCH_HISTORY_KEY)) : [];
  }

  getSearchLocatedByName(str: string) {
    if(!this.chosenCountry)
      return this.errorText = Config.ERROR_CHOOSE_COUNTRY;
    localStorage.setItem(Config.COUNTRY_NAME_KEY, this.chosenCountry);
    this.customLocationsService.getData(str, Config.NUM_START_PAGE).subscribe(data => {
      if (data.listings.length > 0) {
        this.router.navigate(['/searchResults'], {queryParams: {strSearch: str}});
      } else {
        this.errorText = "There was a problem with your search";
        return;
      }
    });
  }

  getCurrentLocations() {
    this.errorText = this.chosenCountry ? null : Config.ERROR_CHOOSE_COUNTRY;
    if(this.errorText)
      return;
    localStorage.setItem(Config.COUNTRY_NAME_KEY, this.chosenCountry);

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
      .map(data => data.locations.map(this.getTitleFormatted))
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
