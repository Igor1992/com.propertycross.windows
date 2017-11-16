import { Component, OnInit } from '@angular/core';

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
    this.favoritesObjects = this.getFavesLocated();
    if(!this.favoritesObjects || this.favoritesObjects.length == 0){
      this.textError = "You have not added any properties to your favourites";
    }
  }

  getFavesLocated(): Object[]{
    return localStorage.favoritesObjects
      ? JSON.parse(localStorage.favoritesObjects) : [];
  }

}

