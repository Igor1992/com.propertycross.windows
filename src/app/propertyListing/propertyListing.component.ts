import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CURRENT_OBJ_KEY, FAVES_OBJ_KEY} from "../appConfig/app.config";

@Component({
  selector: 'prop-listing',
  styleUrls: ['propertyListing.component.css'],
  templateUrl: 'propertyListing.component.html'
})

export class PropertyListing implements OnInit {
  id: string;
  strSearch: string;
  curPropListings: Object[];
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
      this.curPropListings = this.searchCurObject(JSON.parse(localStorage.getItem(FAVES_OBJ_KEY)));
    }else{
      this.curPropListings = this.searchCurObject(JSON.parse(localStorage.getItem(CURRENT_OBJ_KEY)));
    }
  }

  toggleFavorite() {
    let favesObj = localStorage.getItem(FAVES_OBJ_KEY);
    this.favoritesObjects = favesObj
      ? JSON.parse(favesObj) : [];

    this.favoritesObjects.push(this.curPropListings[0]);
    localStorage.setItem(FAVES_OBJ_KEY, JSON.stringify(this.favoritesObjects));
    console.assert("Object added in favourite");
  }

  private searchCurObject(listings: any[]) : any[]{
    return listings.filter(listing => {
      return listing.img_url == this.id;
    });
  }

}
