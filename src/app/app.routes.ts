import { Routes } from '@angular/router';

import { SearchResultsByName } from './searchByName/searchResultsByName';
import { HomeComponent } from './home/home.component';
import { PropertyListing } from './propertyListing/propertyListing.component';
import { FavesObj } from './favesObj/favesObj.component';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'propertyListing', component: PropertyListing },
  { path: 'searchResults', component: SearchResultsByName },
  { path: 'favesObjects', component: FavesObj }
];

