import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { SearchResultsByName } from './searchByName/searchResultsByName';
import { PropertyListing } from './propertyListing/propertyListing.component';
import { FavesObj } from './favesObj/favesObj.component';
import { CustomLocationsService } from './services/customLocationsData.service';
import { CurrentLocationsService } from './services/currentLocationsData.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsByName,
    HomeComponent,
    PropertyListing,
    FavesObj
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    CustomLocationsService,
    CurrentLocationsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
