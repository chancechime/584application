import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';
import { City } from './city';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  public cities: City[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.http.get<City[]>(`${environment.baseUrl}/api/Cities`).subscribe(
      {
        next: result => this.cities = result,
        error: e => console.error(e)
      }
    );
  }
}
