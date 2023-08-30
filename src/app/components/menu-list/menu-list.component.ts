import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  menuList: any[] = [];
  selectedOption: string = 'breakfast';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        const restaurantId = +params.get('id')!;
        this.getMenuInfo(restaurantId);
      }
    });
  }

  addItemToCart(item: any): void {
    this.apiService.addToCart(item);
    this.apiService.openSnackBar('Item added to cart')
  }
  

  getMenuInfo(restaurantId: number): void {
    this.apiService.getMenuItems(restaurantId).subscribe(
      (response) => {
        this.menuList = response.menu;
      },
      (error) => {
        console.error('Error fetching menuList:', error);
      }
    );
  }


}
