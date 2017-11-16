import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {CurrentLocationsService} from '../services/currentLocationsData.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  instructionText: string;
  errorText: string;
  strSearch: string;
  lastSearchLocations: Object[];
  currentLocations: Object[];

  constructor(private router: Router, private customLocationsService: CustomLocationsService,
              private currentLocationsService: CurrentLocationsService) {
    this.instructionText = "Recent searches:";
  }

  ngOnInit() {
    this.lastSearchLocations = localStorage.searchLocationsHistory
      ? JSON.parse(localStorage.searchLocationsHistory) : [];
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
    this.currentLocationsService.getData().subscribe(data => {
      this.instructionText = "Please select a location below:";
      this.currentLocations = data._body.response.locations;
    });
  }

  goFavesPage() {
    this.router.navigate(['/favesObjects']);
  }

}
