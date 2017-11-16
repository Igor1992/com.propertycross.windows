import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {SearchLocation} from '../searchLocation';

@Component({
  selector: 'search-results-by-name',
  styleUrls: ['searchResultsByName.css'],
  templateUrl: 'searchResultsByName.html'
})

export class SearchResultsByName implements OnInit, OnDestroy {
  responseListings: Object[];
  searchLocationsHistory: Object[];
  strSearch: string;
  numPage: number;
  isAddedNewObject: boolean;
  isLoad: boolean = false;

  constructor(private route: ActivatedRoute, private customLocationsService: CustomLocationsService) {}

  ngOnDestroy() {
    debugger;
    this.searchLocationsHistory.unshift(new SearchLocation(this.strSearch,
      this.responseListings.length));

    if(this.searchLocationsHistory.length > 4){
      this.searchLocationsHistory = this.searchLocationsHistory.slice(0, 5);
    }

    localStorage.searchLocationsHistory = JSON.stringify(this.searchLocationsHistory);
  }

  ngOnInit() {
    this.searchLocationsHistory = localStorage.searchLocationsHistory
      ? JSON.parse(localStorage.searchLocationsHistory) : [];

    this.numPage = 1;
    this.route
      .queryParams
      .subscribe(params => {
        this.strSearch = params['strSearch'];
      });

    this.customLocationsService.getData(this.strSearch, this.numPage + 1).subscribe(data => {
      if (data._body.response.listings.length > 0) {
        this.isAddedNewObject = true;
      }
    });

    this.customLocationsService.getData(this.strSearch, this.numPage).subscribe(data => {
      this.responseListings = data._body.response.listings;
      localStorage.currentObjectsInList = JSON.stringify(this.responseListings);
    });
  }

  searchMoreObjects() {
    this.isLoad = true;
    this.numPage++;
    this.customLocationsService.getData(this.strSearch, this.numPage).subscribe(data => {
      if (data._body.response.listings.length > 0) {
        this.responseListings = this.responseListings.concat(data._body.response.listings);
        this.isLoad = false;
        localStorage.currentObjectsInList = JSON.stringify(this.responseListings);
        debugger;
      } else {
        this.isAddedNewObject = false;
      }
    });
  }
}
