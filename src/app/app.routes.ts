import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';

export const routes: Routes = [
    {path: "countries", component: CountryComponent},
    {path: "cities", component: CityComponent}
];