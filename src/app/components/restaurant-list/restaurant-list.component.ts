import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  restaurants: any[] = [];

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.apiService.getRestaurants().subscribe(
      (response) => {
        this.restaurants = response;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  handleProductInfo(e: number) {
    this.router.navigate(['/restaurants', e]);
  }
}
