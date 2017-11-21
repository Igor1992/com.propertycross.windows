import { Component, OnInit } from '@angular/core';
import {favesObjKey} from "../appConfig/app.config";

@Component({
  selector: 'search-results-by-name',
  styleUrls: ['favesObj.component.css'],
  templateUrl: 'favesObj.component.html'
})

export class FavesObj implements OnInit{
  textError: string;
  favoritesObjects: Object[];

  constructor(){}

  ngOnInit() {
    debugger;
    this.favoritesObjects = this.getFavesLocated();
    if(!this.favoritesObjects || this.favoritesObjects.length == 0){
      this.textError = "You have not added any properties to your favourites";
    }
  }

  getFavesLocated(): Object[]{
    return localStorage.getItem(favesObjKey)
      ? JSON.parse(localStorage.getItem(favesObjKey)) : [];
  }

}

