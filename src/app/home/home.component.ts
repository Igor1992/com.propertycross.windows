import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {CurrentLocationsService} from '../services/currentLocationsData.service';
import {searchHistoryKey} from '../appConfig/app.config';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


import {SearchLocation} from "../searchLocation";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  instructionText: string;
  errorText: string;
  strSearch: string;
  lastSearchLocations: SearchLocation[];
  currentLocations: any[];

  constructor(private router: Router, private customLocationsService: CustomLocationsService,
              private currentLocationsService: CurrentLocationsService) {
    this.instructionText = "Recent searches:";
  }

  ngOnInit() {
    this.lastSearchLocations = localStorage.getItem(searchHistoryKey)
      ? JSON.parse(localStorage.getItem(searchHistoryKey)) : [];
  }

  getSearchLocatedByName(str: string) {
    let numStartPage = 1;
    this.customLocationsService.getData(str, numStartPage).subscribe(data => {

      if (data._body.response.listings.length > 0) {
        this.router.navigate(['/searchResults'], {queryParams: {strSearch: str}});
      } else {
        this.errorText = "There was a problem with your search";
        return;
      }
    });
  }

  getCurrentLocations() {
    this.currentLocationsService.getData()
      .filter(data => !!(data && data.locations))
      .map(data => data.locations.map((loc: IDataL) => {
        loc.long_title_formatted = loc.long_title.replace(",", "_");
        return loc;
      }))
      .subscribe(locations => {
        this.instructionText = "Please select a location below:";
        this.currentLocations = locations;
      });
  }

  goFavesPage() {
    this.router.navigate(['/favesObjects']);
  }

}
