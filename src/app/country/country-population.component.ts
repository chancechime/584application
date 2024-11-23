import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CountryPopulation } from './countrypopulation';
import { environment } from '../../environments/environment.development'; // Adjust the path as needed

@Component({
  selector: 'app-country-population',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-population.component.html',
  styleUrls: ['./country-population.component.scss'] // Corrected to styleUrls
})
export class CountryPopulationComponent implements OnInit {
  id: number = -1;
  public CountryPopulation!: CountryPopulation[];
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');

    this.id = idParam ? +idParam : -1; // + converts string to number else -1

    
    this.http.get<CountryPopulation[]>(`${environment.baseUrl}api/Countries/countryPopulation/${this.id}`).subscribe(
      {
        next: result => 
          {
            this.CountryPopulation = result
            
          },
        error: e => console.error(e)
      }
    );
  }
}
