import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'prop-listing',
  styleUrls: ['propertyListing.component.css'],
  templateUrl: 'propertyListing.component.html'
})

export class PropertyListing implements OnInit {
  id: string;
  strSearch: string;
  curPropListing: Object;
  favoritesObjects: Object[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.strSearch = params['curStrSearch'];
      });

    if (!this.strSearch) {
      this.searchCurObject(JSON.parse(localStorage.favoritesObjects));
    }

    this.searchCurObject(JSON.parse(localStorage.currentObjectsInList));
  }

  toggleFavorite() {
    this.favoritesObjects = localStorage.favoritesObjects
      ? JSON.parse(localStorage.favoritesObjects) : [];

    this.favoritesObjects.push(this.curPropListing);
    localStorage.favoritesObjects = JSON.stringify(this.favoritesObjects);
    console.log("Object added in favourite");
  }

  private searchCurObject(listings: Object[]) {
    listings.forEach(listing => {
      if (listing.img_url === this.id) {
        this.curPropListing = listing;
        return;
      }
    });
  }

}
