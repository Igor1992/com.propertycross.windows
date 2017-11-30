import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomLocationsService} from '../services/customLocationsData.service';
import {SearchLocation} from '../searchLocation';
import {searchHistoryKey, currentObjKey} from '../appConfig/app.config';

@Component({
  selector: 'search-results-by-name',
  styleUrls: ['searchResultsByName.css'],
  templateUrl: 'searchResultsByName.html'
})

export class SearchResultsByName implements OnInit, OnDestroy {
  responseListings: IDataListing[];
  totalCountResults: number;
  searchLocationsHistory: SearchLocation[];
  strSearch: string;
  numPage: number;
  isAddedNewObject: boolean;
  isLoad: boolean = false;

  constructor(private route: ActivatedRoute, private customLocationsService: CustomLocationsService) {}

  ngOnDestroy() {
    debugger;
    this.searchLocationsHistory.unshift(new SearchLocation(this.strSearch,
      this.totalCountResults));

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

    this.customLocationsService.getData(this.strSearch, this.numPage)
      .subscribe(data => {
        this.responseListings = data.listings;
        this.totalCountResults = data.total_results;
        localStorage.setItem(currentObjKey, JSON.stringify(this.responseListings));
      });
  }

    searchMoreObjects() {
        this.isLoad = true;
        this.numPage++;
        this.customLocationsService.getData(this.strSearch, this.numPage)
          .filter(data => !!(data && data.listings))
          .map(data => {
            return data.listings;
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
            this.isAddedNewObject = data.listings.length > 0;
        });
    }

}
