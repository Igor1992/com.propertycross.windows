import { Component, OnInit } from '@angular/core';
import {FAVES_OBJ_KEY} from "../appConfig/app.config";

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
    let favesObj = localStorage.getItem(FAVES_OBJ_KEY);
    return favesObj
      ? JSON.parse(favesObj) : [];
  }

}

