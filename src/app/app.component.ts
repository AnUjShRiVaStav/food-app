import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'food-app';
  cart: any[] = []
  constructor(public appService: ApiService,public dialog: MatDialog){}

  ngOnInit(): void {
      this.appService.cartItems$.subscribe(data => this.cart = data)
  }

  openDialog(): void {
    if(this.cart.length == 0) return;
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '600px', 
      minHeight: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
