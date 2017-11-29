import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {SearchLocation} from '../searchLocation';
import {searchHistoryKey, currentObjKey} from '../appConfig/app.config';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';

@Component({
  selector: 'search-results-by-name',
  styleUrls: ['searchResultsByName.css'],
  templateUrl: 'searchResultsByName.html'
})

export class SearchResultsByName implements OnInit, OnDestroy {
  responseListings: any[];
  searchLocationsHistory: SearchLocation[];
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

    localStorage.setItem(searchHistoryKey, JSON.stringify(this.searchLocationsHistory));
  }

  ngOnInit() {
    this.searchLocationsHistory = localStorage.getItem(searchHistoryKey)
      ? JSON.parse(localStorage.getItem(searchHistoryKey)) : [];

    this.numPage = 1;
    this.route
      .queryParams
      .subscribe(params => {
        this.strSearch = params['strSearch'];
      });

        this.checkIsNewObjects();

    this.customLocationsService.getData(this.strSearch, this.numPage).subscribe(data => {
      this.responseListings = data._body.response.listings;
      localStorage.setItem(currentObjKey, JSON.stringify(this.responseListings));
    });
  }

    searchMoreObjects() {
        this.isLoad = true;
        this.numPage++;
        this.customLocationsService.getData(this.strSearch, this.numPage)
          .filter(data => data && data._body && data._body.response)
          .map(data => {
            return data._body.response.listings;
          })
          .subscribe(listings => {
            if(listings.length > 0){
              this.responseListings = this.responseListings.concat(listings);
              this.isLoad = false;
              localStorage.setItem(currentObjKey, JSON.stringify(this.responseListings));
            }
            else{
              this.isAddedNewObject = false;
              this.isLoad = false;
            }
          });

        this.checkIsNewObjects();
    }

    checkIsNewObjects() {
        this.customLocationsService.getData(this.strSearch, this.numPage + 1).subscribe(data => {
            this.isAddedNewObject = data._body.response.listings.length > 0;
        });
    }

}
