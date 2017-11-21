import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {favesObjKey, currentObjKey} from "../appConfig/app.config";

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
      this.curPropListings = this.searchCurObject(JSON.parse(localStorage.getItem(favesObjKey)));
    }else{
      this.curPropListings = this.searchCurObject(JSON.parse(localStorage.getItem(currentObjKey)));
    }
  }

  toggleFavorite() {
    debugger;
    this.favoritesObjects = localStorage.getItem(favesObjKey)
      ? JSON.parse(localStorage.getItem(favesObjKey)) : [];

    this.favoritesObjects.push(this.curPropListings[0]);
    localStorage.setItem(favesObjKey, JSON.stringify(this.favoritesObjects));
    console.log("Object added in favourite");
  }

  private searchCurObject(listings: any[]) : any[]{
    return listings.filter(listing => {
      return listing.img_url == this.id;
    });
  }

}
